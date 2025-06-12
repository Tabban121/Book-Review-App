import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import Review_router from './routes/review.routes';
import { connectDB } from './config/db';
import book_router from './routes/book.routes';


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Book Review API Running');
});
// routes usage :)
app.use('/api/auth', authRoutes);
app.use('/api/books', book_router);
app.use('/api/reviews', Review_router);

connectDB();

export default app;
