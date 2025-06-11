// src/controllers/book.controller.ts
import { Request, Response } from 'express';
import { BookService } from '../services/book.service';

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

  getAll: async (_req: Request, res: Response) => {
    const books = await BookService.getAllBooks();
    res.json(books);
  },
};
