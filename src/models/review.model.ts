import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  book: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
}

const ReviewSchema: Schema = new Schema(
  {
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
  },
  { timestamps: true }
);

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
