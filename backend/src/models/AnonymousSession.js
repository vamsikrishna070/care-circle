import mongoose from 'mongoose';

const anonymousSessionSchema = new mongoose.Schema({
  user1Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  user2Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
anonymousSessionSchema.index({ user1Id: 1, user2Id: 1 });
anonymousSessionSchema.index({ isActive: 1 });

const AnonymousSession = mongoose.model('AnonymousSession', anonymousSessionSchema);

export default AnonymousSession;
