import { Response, Request, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Token } from '../models/token';

const auth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  const clientToken = authorization?.split(' ').pop();
  const tokens = await Token.find({});

  if (req.method === 'GET') {
    next();
    return;
  }

  let isAuth = false;
  tokens.forEach(({ token }) => {
    if (clientToken === token) {
      isAuth = true;
    }
  });

  if (isAuth) {
    next();
  } else {
    next(createError(401, 'Not authorized'));
  }
});

export default auth;
