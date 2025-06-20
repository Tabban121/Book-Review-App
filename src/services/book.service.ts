// src/services/book.service.ts
import { BookRepository } from '../repositories/book.repository';
// This service layer handles the business logic for book operations.
export const BookService = {
  createBook: (userId: string, data: any) => {
    return BookRepository.create({ ...data, user: userId });
  },

  // async creates a promise :)
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

