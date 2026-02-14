import User from '../models/User.js';
import MoodLog from '../models/MoodLog.js';
import JournalEntry from '../models/JournalEntry.js';

// @desc    Get dashboard stats
// @route   GET /api/dashboard/stats
// @access  Private
export const getDashboardStats = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // Get mood logs for the last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const recentMoods = await MoodLog.find({
      userId: req.user._id,
      createdAt: { $gte: sevenDaysAgo }
    }).sort({ createdAt: -1 });

    const avgMood = recentMoods.length > 0
      ? recentMoods.reduce((sum, log) => sum + log.score, 0) / recentMoods.length
      : 0;

    // Get total journal entries
    const totalEntries = await JournalEntry.countDocuments({ userId: req.user._id });

    res.json({
      currentStreak: user.currentStreak,
      riskLevel: user.riskLevel,
      averageMood: avgMood.toFixed(1),
      totalEntries,
      recentMoods: recentMoods.slice(0, 10)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
