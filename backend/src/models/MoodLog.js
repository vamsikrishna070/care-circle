import mongoose from 'mongoose';

const moodLogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mood: {
    type: String,
    required: [true, 'Mood is required'],
    enum: ['Happy', 'Excited', 'Grateful', 'Calm', 'Neutral', 'Tired', 'Sad', 'Anxious', 'Frustrated']
  },
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
moodLogSchema.index({ userId: 1, createdAt: -1 });

const MoodLog = mongoose.model('MoodLog', moodLogSchema);

export default MoodLog;
