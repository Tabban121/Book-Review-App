import { BookDocument } from '../models/book.model';
import { ReviewDocument } from '../models/review.model';
import mongoose from 'mongoose';

interface ReviewResponse {
  id: string;
  user: {
    id: string;
    email: string;
  };
  rating: number;
  comment: string;
}

interface BookResponse {
  id: string;
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
  user: {
    id: string;
    email: string;
  };
  averageRating: number;
  reviews: ReviewResponse[];
  createdAt: string;
  updatedAt: string;
}
// req status /code :)
interface FormattedResponse {
  status: string;
  code: number;
  data: {
    books: BookResponse[];
  };
}

export const formatBookResponse = async (
  books: BookDocument[],
  getReviewsForBook: (bookId: string) => Promise<ReviewDocument[]>
): Promise<FormattedResponse> => {
  const formattedBooks = await Promise.all(
    books.map(async (book) => {
      const bookId = book._id instanceof mongoose.Types.ObjectId
        ? book._id.toString()
        : String(book._id);

      const user = book.user && typeof book.user === 'object' && '_id' in book.user && 'email' in book.user
        ? {
            id: book.user._id instanceof mongoose.Types.ObjectId
              ? book.user._id.toString()
              : String(book.user._id),
            email: book.user.email,
          }
        : {
            id: '',
            email: 'unknown',
          };

      const reviews = await getReviewsForBook(bookId);

      const formattedReviews: ReviewResponse[] = reviews.map((rev) => {
        const reviewUser = rev.user && typeof rev.user === 'object' && '_id' in rev.user && 'email' in rev.user
          ? {
              id: rev.user._id instanceof mongoose.Types.ObjectId
                ? rev.user._id.toString()
                : String(rev.user._id),
              email: rev.user.email,
            }
          : {
              id: '',
              email: 'unknown',
            };

        return {
          id: rev._id instanceof mongoose.Types.ObjectId
            ? rev._id.toString()
            : String(rev._id),
          rating: rev.rating,
          comment: rev.comment,
          user: reviewUser,
        };
      });

      const averageRating =
        reviews.length > 0
          ? parseFloat(
              (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(2)
            )
          : 0;

      return {
        id: bookId,
        title: book.title,
        author: book.author,
        description: book.description ?? '',
        publishedYear: book.publishedYear ?? 0,
        user,
        averageRating,
        reviews: formattedReviews,
        createdAt: book.createdAt.toISOString(),
        updatedAt: book.updatedAt.toISOString(),
      };
    })
  );

  return {
    status: 'success',
    code: 200,
    data: {
      books: formattedBooks,
    },
  };
};
