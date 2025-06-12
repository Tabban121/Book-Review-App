// src/models/review.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user.model';
import { BookDocument } from './book.model';

export interface ReviewDocument extends Document {
  user: UserDocument | mongoose.Types.ObjectId;
  book: BookDocument | mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

export const Review = mongoose.model<ReviewDocument>('Review', reviewSchema);
