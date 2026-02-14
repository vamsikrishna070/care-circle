import express from 'express';
import {
  createJournalEntry,
  getJournalEntries,
  getJournalEntry,
  updateJournalEntry,
  deleteJournalEntry
} from '../controllers/journalController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getJournalEntries)
  .post(protect, createJournalEntry);

router.route('/:id')
  .get(protect, getJournalEntry)
  .put(protect, updateJournalEntry)
  .delete(protect, deleteJournalEntry);

export default router;
