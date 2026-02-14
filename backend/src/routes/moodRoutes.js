import express from 'express';
import { createMoodLog, getMoodLogs, getMoodStats } from '../controllers/moodController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getMoodLogs)
  .post(protect, createMoodLog);

router.get('/stats', protect, getMoodStats);

export default router;
