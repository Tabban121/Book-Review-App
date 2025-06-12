import express from 'express';
import {
  createReview,
  updateReview,
  deleteReview
} from '../controllers/review.controller';
import isAuthenticated from '../middlewares/isAuthenticated';

const router = express.Router();

router.post('/', isAuthenticated, createReview);
router.put('/:id', isAuthenticated, updateReview);
router.delete('/:id', isAuthenticated, deleteReview);

export default router;
