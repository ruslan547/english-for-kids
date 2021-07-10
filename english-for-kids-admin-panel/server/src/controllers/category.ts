import { Request, Response } from 'express';
import { v2 } from 'cloudinary';
import asyncHandler from 'express-async-handler';
import { Category } from '../models/category';
import { Card } from '../models/card';
import pathsConstants from '../constants/paths';

export const getCategories = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? +req.query.limit : 0;
  const skip = limit * (req.query.page ? +req.query.page : 0);
  const cursor = Category.find({}, null, { limit, skip }).cursor();
  const count = await Category.count();
  const body = [];

  res.header('X-Total-Count', count.toString());
  res.header('Access-Control-Expose-Headers', `X-Total-Count${skip ? ', Link' : ''}`);
  res.status(200);

  for await (const category of cursor) {
    body.push(category);
  }

  res.status(200).json(body);
});

export const createCategory = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  const image = pathsConstants.IMG_FILLER;
  const category = new Category({ title, words: 0, image });

  await category.save();
  res.status(201).json(category);
});

export const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { _id, title } = req.body;

  await Category.findOneAndUpdate({ _id }, { title }, { new: true });
  res.status(200).json({ message: 'Updated' });
});

export const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const cards = await Card.find({ category: _id });

  cards.forEach(async ({ image, audio }) => {
    if (image !== pathsConstants.IMG_FILLER) {
      await v2.uploader.destroy(image);
    }

    if (audio !== pathsConstants.AUDIO_FILLER) {
      await v2.uploader.destroy(audio);
    }
  });

  await Card.find({ category: _id }).remove().exec();
  await Category.find({ _id }).remove().exec();
  res.status(200).json({ message: 'Deleted' });
});
