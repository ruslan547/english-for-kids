import { Request, Response } from 'express';
import createError from 'http-errors';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import { User } from '../models/user';

const registration = asyncHandler(async (req: Request, res: Response) => {
  const { username, password, repeatPassword } = req.body;

  if (password === repeatPassword) {
    const foundUsers = await User.find({ username });

    if (!foundUsers.length) {
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

      const user = new User({
        username,
        password: passwordHash,
      });

      await user.save();
      res.status(201).json('User added');
    } else {
      throw createError(400, 'There is already such a user');
    }
  } else {
    throw createError(400, 'The password does not match');
  }
});

export default registration;
