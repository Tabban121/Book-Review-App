// src/routes/book.routes.ts
import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import isAuthenticated  from '../middlewares/isAuthenticated';

const book_router = Router();

book_router.post('/', isAuthenticated, BookController.create);
book_router.put('/:id', isAuthenticated, BookController.update);
book_router.delete('/:id', isAuthenticated, BookController.remove);
book_router.get('/:id', BookController.getOne);        
book_router.get('/', BookController.getAll);           

export default book_router;
