// src/repositories/book.repository.ts
import { Book } from '../models/book.model';
// import { Types } from 'mongoose';

export const BookRepository = {
  create: (data: any) => Book.create(data),

  updateById: (id: string, data: any) =>
    Book.findByIdAndUpdate(id, data, { new: true }),

  deleteById: (id: string) => Book.findByIdAndDelete(id),

  findByUser: (userId: string) => Book.find({ user: userId }),

  findById: (id: string) => Book.findById(id),
  
  findAll: () => Book.find().populate('user', 'email'), // optional populate
};
