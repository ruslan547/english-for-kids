import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import createError from 'http-errors';
import { Category } from '../models/category';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? +req.query.limit : 0;
  const skip = limit * (req.query.page ? +req.query.page : 0);
  const cursor = Category.find({}, null, { limit, skip }).cursor();
  const count = Category.count();

  res.header('Content-Type', 'application/json');
  res.header('X-Total-Count', count.toString());
  res.header('Access-Control-Expose-Headers', `X-Total-Count${skip ? ', Link' : ''}`);
  res.status(200);

  for await (const category of cursor) {
    res.write(JSON.stringify(`${category},`));
  }

  res.end();
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  const foundCategory = (await Category.find({ title }))[0];

  if (foundCategory) {
    throw createError(400, 'The category already exists');
  }

  const category = new Category({ title, words: 0 });

  await category.save();
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { title, newTitle } = req.body;

  await Category.findOneAndUpdate({ title }, { title: newTitle }, { new: true });
  res.status(200).json({ message: 'Updated' });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;

  await Category.find({ title }).remove().exec();
  res.status(200).json({ message: 'Deleted' });
});
