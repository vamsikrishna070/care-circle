import mongoose from 'mongoose';

const riskHistorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  riskLevel: {
    type: String,
    enum: ['Stable', 'Moderate', 'High'],
    required: true
  },
  reason: {
    type: String,
    default: 'Automatic assessment'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for faster queries
riskHistorySchema.index({ userId: 1, createdAt: -1 });

const RiskHistory = mongoose.model('RiskHistory', riskHistorySchema);

export default RiskHistory;
