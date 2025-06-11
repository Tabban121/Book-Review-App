// src/services/book.service.ts
import { BookRepository } from '../repositories/book.repository';

export const BookService = {
  createBook: (userId: string, data: any) => {
    return BookRepository.create({ ...data, user: userId });
  },

  updateBook: async (bookId: string, userId: string, data: any) => {
    const book = await BookRepository.findById(bookId);
    if (!book || book.user.toString() !== userId) throw new Error('Unauthorized');
    return BookRepository.updateById(bookId, data);
  },

  deleteBook: async (bookId: string, userId: string) => {
    const book = await BookRepository.findById(bookId);
    if (!book || book.user.toString() !== userId) throw new Error('Unauthorized');
    return BookRepository.deleteById(bookId);
  },

  getBookById: (bookId: string) => BookRepository.findById(bookId),

  getAllBooks: () => BookRepository.findAll(),

  getBooksByUser: (userId: string) => BookRepository.findByUser(userId),
};
// This service layer abstracts the business logic and interacts with the repository layer.