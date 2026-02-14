import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { createServer } from 'http';
import { Server } from 'socket.io';
import connectDB from './config/database.js';
import { errorHandler, notFound } from './middleware/error.js';
import authRoutes from './routes/authRoutes.js';
import moodRoutes from './routes/moodRoutes.js';
import journalRoutes from './routes/journalRoutes.js';
import careContactRoutes from './routes/careContactRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import AnonymousSession from './models/AnonymousSession.js';
import Message from './models/Message.js';
import jwt from 'jsonwebtoken';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();
const httpServer = createServer(app);

// Socket.IO setup
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'CareCircle+ API is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/moods', moodRoutes);
app.use('/api/journal', journalRoutes);
app.use('/api/care-contacts', careContactRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

// Socket.IO for anonymous chat
const waitingUsers = new Map(); // userId -> socketId
const activeSessions = new Map(); // sessionId -> {user1Socket, user2Socket}

// Socket.IO authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  
  if (!token) {
    return next(new Error('Authentication error'));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    socket.userId = decoded.id;
    next();
  } catch (error) {
    next(new Error('Authentication error'));
  }
});

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId}`);

  // Find a partner for anonymous chat
  socket.on('find-partner', async () => {
    try {
      // Check if user is already in waiting list
      if (waitingUsers.has(socket.userId)) {
        return socket.emit('error', { message: 'Already searching for a partner' });
      }

      // Check if there's someone waiting
      const waitingUser = Array.from(waitingUsers.entries()).find(
        ([userId]) => userId !== socket.userId
      );

      if (waitingUser) {
        const [partnerId, partnerSocketId] = waitingUser;
        waitingUsers.delete(partnerId);

        // Create anonymous session
        const session = await AnonymousSession.create({
          user1Id: socket.userId,
          user2Id: partnerId,
          isActive: true
        });

        const partnerSocket = io.sockets.sockets.get(partnerSocketId);

        if (partnerSocket) {
          // Join both users to a room
          const roomId = session._id.toString();
          socket.join(roomId);
          partnerSocket.join(roomId);

          activeSessions.set(roomId, {
            user1Socket: socket.id,
            user2Socket: partnerSocketId
          });

          // Notify both users
          socket.emit('partner-found', { sessionId: roomId });
          partnerSocket.emit('partner-found', { sessionId: roomId });
        }
      } else {
        // Add to waiting list
        waitingUsers.set(socket.userId, socket.id);
        socket.emit('waiting', { message: 'Searching for a partner...' });
      }
    } catch (error) {
      console.error('Find partner error:', error);
      socket.emit('error', { message: 'Failed to find partner' });
    }
  });

  // Send message
  socket.on('send-message', async ({ sessionId, content }) => {
    try {
      // Save message to database
      const message = await Message.create({
        sessionId,
        senderId: socket.userId,
        content,
        isToxic: false // You can add toxic content detection here
      });

      // Send to room
      io.to(sessionId).emit('new-message', {
        _id: message._id,
        content: message.content,
        senderId: message.senderId,
        createdAt: message.createdAt,
        isOwn: false // Will be determined by client
      });
    } catch (error) {
      console.error('Send message error:', error);
      socket.emit('error', { message: 'Failed to send message' });
    }
  });

  // End session
  socket.on('end-session', async ({ sessionId }) => {
    try {
      await AnonymousSession.findByIdAndUpdate(sessionId, { isActive: false });
      
      // Notify both users
      io.to(sessionId).emit('session-ended');
      
      // Clean up
      const sessionData = activeSessions.get(sessionId);
      if (sessionData) {
        const { user1Socket, user2Socket } = sessionData;
        io.sockets.sockets.get(user1Socket)?.leave(sessionId);
        io.sockets.sockets.get(user2Socket)?.leave(sessionId);
        activeSessions.delete(sessionId);
      }
    } catch (error) {
      console.error('End session error:', error);
    }
  });

  // Cancel waiting
  socket.on('cancel-waiting', () => {
    waitingUsers.delete(socket.userId);
    socket.emit('waiting-cancelled');
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
    waitingUsers.delete(socket.userId);
    
    // End any active sessions
    for (const [sessionId, sessionData] of activeSessions.entries()) {
      if (sessionData.user1Socket === socket.id || sessionData.user2Socket === socket.id) {
        io.to(sessionId).emit('partner-disconnected');
        AnonymousSession.findByIdAndUpdate(sessionId, { isActive: false }).catch(console.error);
        activeSessions.delete(sessionId);
      }
    }
  });
});

const PORT = process.env.PORT || 5000;

httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
