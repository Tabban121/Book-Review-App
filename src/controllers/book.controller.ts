// src/controllers/book.controller.ts
import { Request, Response } from 'express';
import { BookService } from '../services/book.service';
// Make sure the file exists at the specified path, or update the path if needed
// Update the import path if the file exists elsewhere, for example:
// Or, if the file does not exist, create it with a basic export:
import { Book } from '../models/book.model';
import { Review } from '../models/review.model';
import { formatBookResponse } from '../dtos/book.dto';


export const BookController = {
  create: async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const book = await BookService.createBook(userId, req.body);
    res.status(201).json(book);
  },

  update: async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    const book = await BookService.updateBook(req.params.id, userId, req.body);
    res.json(book);
  },

  remove: async (req: Request, res: Response) => {
    const userId = res.locals.userId;
    await BookService.deleteBook(req.params.id, userId);
    res.json({ message: 'Book deleted' });
  },

  getOne: async (req: Request, res: Response) => {
    const book = await BookService.getBookById(req.params.id);
    res.json(book);
  },

  getAllBooks: async (req: Request, res: Response) => {
    try {
      const books = await Book.find().populate('user');

      const getReviewsForBook = async (bookId: string) => {
        return await Review.find({ book: bookId }).populate('user');
      };

      const response = await formatBookResponse(books, getReviewsForBook);

      res.status(response.code).json(response);
    } catch (err) {
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'Server Error',
      });
    }
  }
};
