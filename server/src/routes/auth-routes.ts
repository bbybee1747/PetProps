import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const { username, password } = req.body;
  try {

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const user = await User.findOne({ where: { username } });
  if (!user) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const secretKey = process.env.JWT_SECRET_KEY;
  if (!secretKey) {
    throw new Error('JWT_SECRET_KEY is not defined in the environment variables');
  }

  const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });

  return res.json({ token });
} catch (error) {
  console.error(error);
  return res.status(500).json({ message: 'Internal server error' });
}

};

const router = Router();


router.post('/login');

export default router;
