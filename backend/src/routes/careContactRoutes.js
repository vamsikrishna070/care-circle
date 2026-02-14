import express from 'express';
import {
  getCareContacts,
  createCareContact,
  updateCareContact,
  deleteCareContact
} from '../controllers/careContactController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getCareContacts)
  .post(protect, createCareContact);

router.route('/:id')
  .put(protect, updateCareContact)
  .delete(protect, deleteCareContact);

export default router;
