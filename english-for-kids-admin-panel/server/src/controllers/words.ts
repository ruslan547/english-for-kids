import { Request, Response } from 'express';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { v2 } from 'cloudinary';
import { Card, ICard } from '../models/card';

export const createCard = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  if (req.files) {
    const { word, translation, category } = req.body;
    const image = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.image[0].path,
      {
        use_filename: true,
        filename_override: word,
      },
    )).secure_url;
    const audio = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.audio[0].path,
      {
        use_filename: true,
        filename_override: word,
        resource_type: 'video',
      },
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
  const category = req.query.category as string;
  const body = [];

  const cursor = Card.find({ category }, null, { limit, skip }).cursor();
  const count = Card.count();

  res.header('X-Total-Count', count.toString());
  res.header('Access-Control-Expose-Headers', `X-Total-Count${skip ? ', Link' : ''}`);

  for await (const card of cursor) {
    body.push(card);
  }

  res.status(200).json(body);
});

export const updateCard = asyncHandler(async (req: Request, res: Response) => {
  console.log(req.files.image);
  const { _id, word, translation } = req.body;
  const updatedCard = await Card.findById(_id);
  let { image, audio } = updatedCard as ICard;

  await v2.uploader.destroy(image);
  await v2.uploader.destroy(audio);

  if (req.files) {
    image = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.image[0].path,
      {
        use_filename: true,
        filename_override: word,
      },
    )).secure_url;
    audio = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.audio[0].path,
      {
        resource_type: 'video',
        use_filename: true,
        filename_override: word,
      },
    )).secure_url;

    // @ts-expect-error
    fs.unlink(req.files.image[0].path, (err) => {
      throw err;
    });

    // @ts-expect-error
    fs.unlink(req.files.audio[0].path, (err) => {
      throw err;
    });
  }

  await Card.findOneAndUpdate({ _id }, {
    word, translation, image, audio,
  }, { new: true });

  res.status(200).json({ message: 'Updated' });
});

export const deleteCard = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const deletedCard = (await Card.find({ _id }))[0];
  const { image, audio } = deletedCard;

  await Card.findByIdAndDelete(_id);
  await v2.uploader.destroy(image);
  await v2.uploader.destroy(audio);
  res.status(200).json({ message: 'Deleted' });
});
