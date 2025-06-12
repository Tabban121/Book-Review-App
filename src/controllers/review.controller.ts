import { Request, Response } from 'express';
import { Review } from '../models/review.model';
import { Book } from '../models/book.model';

// Create a review

export const createReview = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('📥 Incoming review request body:', req.body);

    const { bookId, rating, comment } = req.body;
    const currentUserId = (req as any).user?.id;
    console.log('👤 Current user ID:', currentUserId);

    if (!bookId || !rating || !comment) {
      res.status(400).json({ message: 'Missing bookId, rating, or comment' });
      return;
    }

    const book = await Book.findById(bookId);
    if (!book) {
      console.log('❌ Book not found for ID:', bookId);
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    if (book.user.toString() === currentUserId) {
      console.log('⚠️ User trying to review their own book');
      res.status(403).json({ message: 'You cannot review your own book :)'  });
      return;
    }

    const alreadyReviewed = await Review.findOne({ book: bookId, user: currentUserId });
    if (alreadyReviewed) {
      console.log('⚠️ Duplicate review detected');
      res.status(400).json({ message: 'You have already reviewed this book' });
      return;
    }

    const review = await Review.create({
      book: bookId,
      user: currentUserId,
      rating,
      comment
    });

    console.log('✅ Review created successfully:', review);
    res.status(201).json(review);

  } catch (error: any) {
    console.error('💥 Create review error:', error.message);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
export const updateReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rating, comment } = req.body;
    const { id } = req.params; // Review ID
    const currentUserId = (req as any).user?.id;

    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    if (review.user.toString() !== currentUserId) {
      res.status(403).json({ message: 'You are not authorized to update this review' });
      return;
    }

    if (rating !== undefined) review.rating = rating;
    if (comment !== undefined) review.comment = comment;

    await review.save();
    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error: any) {
    console.error('💥 Update review error:', error.message);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
export const deleteReview = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params; // Review ID
    const currentUserId = (req as any).user?.id;

    const review = await Review.findById(id);
    if (!review) {
      res.status(404).json({ message: 'Review not found' });
      return;
    }

    if (review.user.toString() !== currentUserId) {
      res.status(403).json({ message: 'You are not authorized to delete this review' });
      return;
    }

    await review.deleteOne();
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error: any) {
    console.error('💥 Delete review error:', error.message);
    res.status(500).json({ message: error.message || 'Server error' });
  }
};



//   export const getReviewsForBook = async (req: Request, res: Response): Promise<void> => {
//     try {
//       const { bookId } = req.params;
//       const reviews = await Review.find({ book: bookId }).populate('user', 'name email');
//       res.status(200).json(reviews); // ✅ no return
//     } catch (error) {
//       console.error('Get reviews error:', error);
//       res.status(500).json({ message: 'Server error' });
//     }
//   };
