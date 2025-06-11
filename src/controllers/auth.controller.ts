// src/controller/auth.controller.ts
import { Request, Response } from 'express';

import { User } from '../models/user.model'; 
import bcrypt from 'bcryptjs';

import crypto from 'crypto';
import { Session } from '../models/session.model'; // session model to have token , use it in authentication :)

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = crypto.randomBytes(32).toString('hex');

await Session.create({
  user: user._id,
  token,
  ipAddress: req.ip,
  userAgent: req.headers['user-agent']
})
  .catch((err) => {
    console.error('Error creating session:', err);
    res.status(500).json({ message: 'Server error' });
    return;
  });

  // Optionally, you can set the token in a cookie or return it in the response
  // res.cookie('token', token, { httpOnly: true, secure: true });
res.status(200).json({ token, user });
};
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(400).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1];

    const deleted = await Session.findOneAndDelete({ token });

    if (!deleted) {
      res.status(404).json({ message: 'Session not found or already logged out' });
      return;
    }

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: err });
  }
};