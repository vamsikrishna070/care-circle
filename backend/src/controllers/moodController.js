import MoodLog from '../models/MoodLog.js';
import User from '../models/User.js';
import RiskHistory from '../models/RiskHistory.js';

// Mood to score mapping
const moodScores = {
  'Happy': 10,
  'Excited': 10,
  'Grateful': 9,
  'Calm': 8,
  'Neutral': 5,
  'Tired': 4,
  'Sad': 2,
  'Anxious': 2,
  'Frustrated': 3
};

// Calculate risk level based on recent moods
const calculateRiskLevel = async (userId) => {
  const recentMoods = await MoodLog.find({ userId })
    .sort({ createdAt: -1 })
    .limit(5);

  if (recentMoods.length === 0) return 'Stable';

  const avgScore = recentMoods.reduce((sum, log) => sum + log.score, 0) / recentMoods.length;

  if (avgScore >= 7) return 'Stable';
  if (avgScore >= 4) return 'Moderate';
  return 'High';
};

// Update streak
const updateStreak = async (userId) => {
  const user = await User.findById(userId);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (user.lastCheckIn) {
    const lastCheckIn = new Date(user.lastCheckIn);
    lastCheckIn.setHours(0, 0, 0, 0);
    
    const daysDiff = Math.floor((today - lastCheckIn) / (1000 * 60 * 60 * 24));

    if (daysDiff === 1) {
      user.currentStreak += 1;
    } else if (daysDiff > 1) {
      user.currentStreak = 1;
    }
  } else {
    user.currentStreak = 1;
  }

  user.lastCheckIn = new Date();
  await user.save();
};

// @desc    Create mood log
// @route   POST /api/moods
// @access  Private
export const createMoodLog = async (req, res) => {
  try {
    const { mood } = req.body;
    const score = moodScores[mood] || 5;

    const moodLog = await MoodLog.create({
      userId: req.user._id,
      mood,
      score
    });

    // Update streak
    await updateStreak(req.user._id);

    // Calculate and update risk level
    const newRiskLevel = await calculateRiskLevel(req.user._id);
    const user = await User.findById(req.user._id);
    
    if (user.riskLevel !== newRiskLevel) {
      user.riskLevel = newRiskLevel;
      await user.save();
      
      // Create risk history entry
      await RiskHistory.create({
        userId: req.user._id,
        riskLevel: newRiskLevel,
        reason: 'Mood check-in assessment'
      });
    }

    res.status(201).json(moodLog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user mood logs
// @route   GET /api/moods
// @access  Private
export const getMoodLogs = async (req, res) => {
  try {
    const { limit = 10, days = 30 } = req.query;
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - parseInt(days));

    const moodLogs = await MoodLog.find({
      userId: req.user._id,
      createdAt: { $gte: dateLimit }
    })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json(moodLogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get mood statistics
// @route   GET /api/moods/stats
// @access  Private
export const getMoodStats = async (req, res) => {
  try {
    const { days = 7 } = req.query;
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - parseInt(days));

    const moodLogs = await MoodLog.find({
      userId: req.user._id,
      createdAt: { $gte: dateLimit }
    });

    if (moodLogs.length === 0) {
      return res.json({
        averageMood: 0,
        totalEntries: 0,
        moodDistribution: {}
      });
    }

    const avgScore = moodLogs.reduce((sum, log) => sum + log.score, 0) / moodLogs.length;
    
    const moodDistribution = moodLogs.reduce((acc, log) => {
      acc[log.mood] = (acc[log.mood] || 0) + 1;
      return acc;
    }, {});

    res.json({
      averageMood: avgScore.toFixed(1),
      totalEntries: moodLogs.length,
      moodDistribution
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
