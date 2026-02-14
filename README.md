# 🌟 Care-Circle

> Empowering emotional wellbeing through technology and connection

Care-Circle is a comprehensive mental health support platform that enables users to track their emotional wellbeing, maintain private journals, connect with trusted care networks, and access anonymous peer support—all in one secure, privacy-first application.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Project Structure](#-project-structure)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🎯 Core Features

- **🧘 Mood Tracking**: Daily emotional check-ins with visual analytics and trend charts
- **📊 Intelligent Dashboard**: Comprehensive overview of mental health patterns and insights
- **📝 Private Journaling**: Secure, encrypted journal entries with mood associations
- **🔔 Risk Detection**: AI-powered risk assessment with proactive alerts
- **👥 Care Circle**: Trusted network of contacts for support and notifications
- **💬 Anonymous Support**: Real-time chat with anonymous peer supporters
- **📈 Data Visualization**: Interactive charts powered by Recharts for mood trends
- **🔒 Privacy First**: End-to-end security with optional anonymous access

### 🛡️ Security Features

- JWT-based authentication
- Bcrypt password hashing
- Rate limiting for API protection
- Helmet.js security headers
- CORS configuration
- Session management

### 🎨 User Experience

- Smooth animations with Framer Motion
- Responsive design with TailwindCSS
- Modern UI components from Radix UI
- Dark/Light theme support (Next Themes)
- Real-time updates with Socket.io
- Mobile-friendly interface

---

## 🚀 Tech Stack

### Frontend

- **Framework**: React 18.3.1
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **UI Components**: Radix UI, Shadcn/ui
- **State Management**: TanStack React Query
- **Routing**: Wouter
- **Animations**: Framer Motion
- **Charts**: Recharts
- **Date Handling**: date-fns
- **Icons**: Lucide React

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT (jsonwebtoken)
- **Password Hashing**: bcryptjs
- **Real-time**: Socket.io
- **Validation**: Express Validator
- **Security**: Helmet, Express Rate Limit
- **Environment**: dotenv

---

## 🎬 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn**
- **MongoDB Atlas Account** (or local MongoDB)
- **Git**

---

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/Care-Circle.git
cd Care-Circle
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## 🔐 Environment Variables

### Backend Configuration

Create a `.env` file in the `backend` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/carecircle?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Secret (Use a strong, random string in production)
JWT_SECRET=your_super_secure_jwt_secret_key_change_in_production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

### Frontend Configuration

The frontend uses Vite's default configuration. Ensure your API calls point to:

- **Development**: `http://localhost:5000`
- **Production**: Update in `frontend/src/lib/api.js`

---

## 🏃 Running the Application

### Development Mode

#### 1. Start MongoDB Atlas

Ensure your MongoDB Atlas cluster is running and your IP is whitelisted:

- Go to [MongoDB Atlas](https://cloud.mongodb.com)
- Navigate to **Network Access** → **Add IP Address**
- Add your current IP or `0.0.0.0/0` (for development only)

#### 2. Start Backend Server

```bash
cd backend
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Production Build

#### Backend

```bash
cd backend
npm start
```

#### Frontend

```bash
cd frontend
npm run build
npm run preview
```

---

## 📡 API Documentation

### Authentication Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register new user   |
| POST   | `/api/auth/login`    | User login          |
| GET    | `/api/auth/profile`  | Get user profile    |
| PUT    | `/api/auth/profile`  | Update user profile |

### Mood Tracking Endpoints

| Method | Endpoint                  | Description           |
| ------ | ------------------------- | --------------------- |
| POST   | `/api/moods`              | Log new mood entry    |
| GET    | `/api/moods`              | Get all mood logs     |
| GET    | `/api/moods/:id`          | Get specific mood log |
| DELETE | `/api/moods/:id`          | Delete mood log       |
| GET    | `/api/moods/stats/trends` | Get mood trends       |

### Journal Endpoints

| Method | Endpoint           | Description             |
| ------ | ------------------ | ----------------------- |
| POST   | `/api/journal`     | Create journal entry    |
| GET    | `/api/journal`     | Get all journal entries |
| GET    | `/api/journal/:id` | Get specific entry      |
| PUT    | `/api/journal/:id` | Update entry            |
| DELETE | `/api/journal/:id` | Delete entry            |

### Care Circle Endpoints

| Method | Endpoint                        | Description       |
| ------ | ------------------------------- | ----------------- |
| POST   | `/api/care-contacts`            | Add care contact  |
| GET    | `/api/care-contacts`            | Get all contacts  |
| PUT    | `/api/care-contacts/:id`        | Update contact    |
| DELETE | `/api/care-contacts/:id`        | Remove contact    |
| POST   | `/api/care-contacts/:id/notify` | Send notification |

### Dashboard Endpoints

| Method | Endpoint                         | Description              |
| ------ | -------------------------------- | ------------------------ |
| GET    | `/api/dashboard/stats`           | Get dashboard statistics |
| GET    | `/api/dashboard/recent-activity` | Get recent activities    |

### Socket.io Events

| Event                  | Description                    |
| ---------------------- | ------------------------------ |
| `connection`           | User connects to socket        |
| `joinAnonymousSupport` | Join anonymous support room    |
| `anonymousMessage`     | Send/receive anonymous message |
| `disconnect`           | User disconnects               |

---

## 📁 Project Structure

```
Care-Circle/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js           # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.js     # Authentication logic
│   │   │   ├── moodController.js     # Mood tracking logic
│   │   │   ├── journalController.js  # Journal management
│   │   │   ├── careContactController.js
│   │   │   └── dashboardController.js
│   │   ├── middleware/
│   │   │   ├── auth.js               # JWT authentication
│   │   │   └── error.js              # Error handling
│   │   ├── models/
│   │   │   ├── User.js               # User schema
│   │   │   ├── MoodLog.js            # Mood log schema
│   │   │   ├── JournalEntry.js       # Journal schema
│   │   │   ├── CareContact.js        # Care contact schema
│   │   │   ├── RiskHistory.js        # Risk tracking schema
│   │   │   ├── Message.js            # Chat message schema
│   │   │   └── AnonymousSession.js   # Anonymous user schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── moodRoutes.js
│   │   │   ├── journalRoutes.js
│   │   │   ├── careContactRoutes.js
│   │   │   └── dashboardRoutes.js
│   │   └── server.js                 # Express server & Socket.io
│   ├── .env                          # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout.js             # App layout wrapper
│   │   │   ├── mood-chart.js         # Mood visualization
│   │   │   ├── protected-route.js    # Route protection
│   │   │   ├── risk-badge.js         # Risk level indicator
│   │   │   ├── stats-card.js         # Dashboard cards
│   │   │   └── ui/                   # Radix UI components
│   │   ├── hooks/
│   │   │   ├── use-auth.js           # Authentication hook
│   │   │   ├── use-moods.js          # Mood management hook
│   │   │   ├── use-journal.js        # Journal hook
│   │   │   ├── use-care-circle.js    # Care contacts hook
│   │   │   ├── use-dashboard.js      # Dashboard data hook
│   │   │   ├── use-chat.js           # Chat functionality
│   │   │   └── use-toast.js          # Toast notifications
│   │   ├── lib/
│   │   │   ├── api.js                # API client
│   │   │   ├── queryClient.js        # React Query config
│   │   │   └── utils.js              # Utility functions
│   │   ├── pages/
│   │   │   ├── auth-page.js          # Login/Register
│   │   │   ├── dashboard.js          # Main dashboard
│   │   │   ├── mood-check-in.js      # Mood logging
│   │   │   ├── journal.js            # Journal page
│   │   │   ├── care-circle.js        # Care network page
│   │   │   ├── anonymous-support.js  # Anonymous chat
│   │   │   └── not-found.js          # 404 page
│   │   ├── App.js                    # Root component
│   │   ├── main.js                   # Entry point
│   │   └── index.css                 # Global styles
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── .gitignore
└── README.md
```

---

## 📸 Screenshots

### Dashboard

![Dashboard Screenshot](docs/images/dashboard.png)
_Comprehensive overview of mental health insights and trends_

### Mood Check-In

![Mood Check-In Screenshot](docs/images/mood-checkin.png)
_Daily emotional tracking with risk assessment_

### Care Circle

![Care Circle Screenshot](docs/images/care-circle.png)
_Manage trusted contacts and support network_

### Anonymous Support

![Anonymous Support Screenshot](docs/images/anonymous-support.png)
_Real-time anonymous peer support chat_

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request**

### Development Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

If you see "Could not connect to MongoDB Atlas":

1. Check your internet connection
2. Verify MongoDB URI in `.env`
3. Whitelist your IP address in MongoDB Atlas
4. Ensure credentials are correct

### Port Already in Use

If ports 5000 or 5173 are busy:

```bash
# Kill process on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Change port in .env (backend) or vite.config.js (frontend)
```

### CORS Errors

Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

- **Full Stack Development**: [Your Name]
- **Frontend Development**: [Team Member]
- **Backend Development**: [Team Member]
- **UI/UX Design**: [Team Member]

---

## 📞 Contact

- **Email**: your-email@example.com
- **GitHub**: [@your-username](https://github.com/your-username)
- **Project Link**: [https://github.com/your-username/Care-Circle](https://github.com/your-username/Care-Circle)

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Radix UI](https://www.radix-ui.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)

---

<div align="center">

**Built with ❤️ for better mental health support**

⭐ Star this repo if you find it helpful!

</div>
