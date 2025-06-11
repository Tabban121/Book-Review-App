// src/models/book.model.ts
import mongoose from 'mongoose';
// schema creation  for book model 
const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String },
    publishedYear: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Book = mongoose.model('Book', bookSchema);
