import { Request, Response } from 'express';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { v2 } from 'cloudinary';
import { Card } from '../models/card';

export const createCard = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (req.files) {
    const { word, translation, category } = req.body;
    // @ts-expect-error
    const image = (await v2.uploader.upload(req.files.image[0].path)).secure_url;
    const audio = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.audio[0].path,
      { resource_type: 'video' },
    )).secure_url;

    const card = new Card({
      word,
      translation,
      category,
      image,
      audio,
    });

    await card.save();

    res.status(201).json(card);

    // @ts-expect-error
    fs.unlink(req.files.image[0].path, (err) => {
      throw err;
    });

    // @ts-expect-error
    fs.unlink(req.files.audio[0].path, (err) => {
      throw err;
    });
  }
});

export const getCards = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? +req.query.limit : 0;
  const skip = limit * (req.query.page ? +req.query.page : 0);
  const cursor = Card.find({}, null, { limit, skip }).cursor();
  const count = Card.count();

  res.header('Content-Type', 'application/json');
  res.header('X-Total-Count', count.toString());
  res.header('Access-Control-Expose-Headers', `X-Total-Count${skip ? ', Link' : ''}`);
  res.status(200);

  for await (const category of cursor) {
    res.write(JSON.stringify(category));
  }

  res.end();
});

export const updateCard = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;

  await Card.find({ _id }).remove().exec();
  // createCard(req, res);
  res.status(200).json({ message: 'Updated' });
});

export const deleteCard = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;

  await Card.find({ _id }).remove().exec();
  res.status(200).json({ message: 'Deleted' });
});
