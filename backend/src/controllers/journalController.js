import JournalEntry from '../models/JournalEntry.js';

// Simple sentiment analysis (you can integrate a real API later)
const analyzeSentiment = (text) => {
  const positiveWords = ['happy', 'joy', 'great', 'amazing', 'wonderful', 'good', 'better', 'grateful', 'thankful', 'blessed'];
  const negativeWords = ['sad', 'angry', 'terrible', 'awful', 'bad', 'worse', 'depressed', 'anxious', 'worried', 'stressed'];
  
  const lowerText = text.toLowerCase();
  let score = 0;
  
  positiveWords.forEach(word => {
    if (lowerText.includes(word)) score += 1;
  });
  
  negativeWords.forEach(word => {
    if (lowerText.includes(word)) score -= 1;
  });
  
  return Math.max(-10, Math.min(10, score));
};

// @desc    Create journal entry
// @route   POST /api/journal
// @access  Private
export const createJournalEntry = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Content is required' });
    }

    const sentimentScore = analyzeSentiment(content);

    const entry = await JournalEntry.create({
      userId: req.user._id,
      content,
      sentimentScore
    });

    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user journal entries
// @route   GET /api/journal
// @access  Private
export const getJournalEntries = async (req, res) => {
  try {
    const { limit = 10, skip = 0 } = req.query;

    const entries = await JournalEntry.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await JournalEntry.countDocuments({ userId: req.user._id });

    res.json({
      entries,
      total,
      hasMore: total > parseInt(skip) + entries.length
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single journal entry
// @route   GET /api/journal/:id
// @access  Private
export const getJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update journal entry
// @route   PUT /api/journal/:id
// @access  Private
export const updateJournalEntry = async (req, res) => {
  try {
    const { content } = req.body;

    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    if (content) {
      entry.content = content;
      entry.sentimentScore = analyzeSentiment(content);
    }

    await entry.save();
    res.json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete journal entry
// @route   DELETE /api/journal/:id
// @access  Private
export const deleteJournalEntry = async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!entry) {
      return res.status(404).json({ message: 'Journal entry not found' });
    }

    await entry.deleteOne();
    res.json({ message: 'Journal entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
