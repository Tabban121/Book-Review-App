// src/models/book.model.ts
import mongoose, { Document, Schema } from 'mongoose';
import { UserDocument } from './user.model'; // assuming you have a user.model.ts

export interface BookDocument extends Document {
  title: string;
  author: string;
  description?: string;
  publishedYear?: number;
  user: UserDocument | mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bookSchema = new Schema<BookDocument>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    publishedYear: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model<BookDocument>('Book', bookSchema);
