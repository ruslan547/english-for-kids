import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { Token } from '../models/token';

const logout = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username } = req.body;

  await Token.find({ username }).remove().exec();
  res.status(200).json({ message: 'logged out' });
});

export default logout;
