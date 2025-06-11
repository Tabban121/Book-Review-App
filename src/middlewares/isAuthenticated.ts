import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { SessionRepository } from '../repositories/session.repository';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  // console.log('🧪 Raw token:', token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string; email: string };

    const session = await SessionRepository.findByToken(token);
    console.log('🧪 Found session:', session);
    if (!session) {
      res.status(401).json({ message: 'Session expired or invalid' });
      return;
    }

    console.log('✅ Valid token & session found:', token);
    res.locals.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default isAuthenticated;
