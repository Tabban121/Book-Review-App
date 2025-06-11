import { Request, Response, NextFunction } from 'express';
import { SessionRepository } from '../repositories/session.repository';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }

  const session = await SessionRepository.findByToken(token);
  console.log('🔍 Found session:', session);

  if (!session) {
    res.status(401).json({ message: 'Session expired or invalid' });
    return;
  }

  res.locals.userId = session.user.toString();
  next();
};

export default isAuthenticated;
