import { Request, Response } from 'express';
import createError from 'http-errors';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { uuid } from 'uuidv4';
import { IUser, User } from '../models/user';
import { Token } from '../models/token';

const isValidPassword = (
  user: IUser,
  password: string,
): boolean => bcrypt.compareSync(password, user.password);

const login = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { username, password } = req.body;

  const foundUser = (await User.find({ username }))[0];

  if (isValidPassword(foundUser, password)) {
    const token = uuid();

    const tokenDb = new Token({
      username,
      token,
    });

    await Token.find({ username }).remove().exec();
    await tokenDb.save();

    res.status(200).json({
      token,
      uid: foundUser._id,
      username: foundUser.username,
    });
  } else {
    throw createError(400, 'Invalid username or password');
  }
});

export default login;
