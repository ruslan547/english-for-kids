import createError from 'http-errors';
import { Response, Request, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const validateAuthParam = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { username, password } = req.body;

  if (typeof username !== 'string' || typeof password !== 'string') {
    throw createError(400, 'Invalid param');
  }

  next();
};
