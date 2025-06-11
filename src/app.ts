import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { connectDB } from './config/db';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Book Review API Running');
});
app.use('/api/auth', authRoutes);


connectDB();

export default app;
