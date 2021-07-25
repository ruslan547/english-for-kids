import { Request, Response } from 'express';
import fs from 'fs';
import asyncHandler from 'express-async-handler';
import { v2 } from 'cloudinary';
import { Category, ICategory } from '../models/category';
import { Card, ICard } from '../models/card';
import pathsConstants from '../constants/paths';

export const createCard = asyncHandler(async (req: Request, res: Response): Promise<void> => {
  const { word, translation, category } = req.body;
  let image;
  let audio;

  // @ts-expect-error
  if (req.files.image) {
    image = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.image[0].path,
      {
        use_filename: true,
        filename_override: word,
      },
    )).secure_url;

    // @ts-expect-error
    fs.unlink(req.files.image[0].path, (err) => {
      if (err) {
        throw err;
      }
    });
  } else {
    image = pathsConstants.IMG_FILLER;
  }

  // @ts-expect-error
  if (req.files.audio) {
    audio = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.audio[0].path,
      {
        use_filename: true,
        filename_override: word,
        resource_type: 'video',
      },
    )).secure_url;

    // @ts-expect-error
    fs.unlink(req.files.audio[0].path, (err) => {
      if (err) {
        throw err;
      }
    });
  } else {
    audio = pathsConstants.AUDIO_FILLER;
  }

  const card = new Card({
    word,
    translation,
    category,
    image,
    audio,
  });

  await card.save();

  const { words } = await Category.findById(category) as unknown as ICategory;

  await Category.findByIdAndUpdate(
    category,
    { words: words + 1, image },
    { new: true },
  );

  res.status(201).json(card);
});

export const getCards = asyncHandler(async (req: Request, res: Response) => {
  const limit = req.query.limit ? +req.query.limit : 0;
  const skip = limit * (req.query.page ? +req.query.page : 0);
  const category = req.query.category as string;
  const body = [];

  let cursor;
  let count;

  if (category) {
    cursor = Card.find({ category }, null, { limit, skip }).cursor();
    count = await Card.find({ category }).count();
  } else {
    cursor = Card.find({}, null, { limit, skip }).cursor();
    count = await Card.find().count();
  }

  res.header('X-Total-Count', count.toString());
  res.header('Access-Control-Expose-Headers', `X-Total-Count${skip ? ', Link' : ''}`);

  for await (const card of cursor) {
    body.push(card);
  }

  res.status(200).json(body);
});

export const updateCard = asyncHandler(async (req: Request, res: Response) => {
  const { _id, word, translation } = req.body;
  const updatedCard = await Card.findById(_id);
  let { image, audio } = updatedCard as ICard;

  // @ts-expect-error
  if (req.files.image) {
    await v2.uploader.destroy(image);

    image = (await v2.uploader.upload(
      // @ts-expect-error
      req.files.image[0].path,
      {
        use_filename: true,
        filename_override: word,
      },
    )).secure_url;

    // @ts-expect-error
    fs.unlink(req.files.image[0].path, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  // @ts-expect-error
  if (req.files.audio) {
    await v2.uploader.destroy(audio);

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
    fs.unlink(req.files.audio[0].path, (err) => {
      if (err) {
        throw err;
      }
    });
  }

  const card = await Card.findOneAndUpdate({ _id }, {
    word, translation, image, audio,
  }, { new: true });

  res.status(200).json(card);
});

export const deleteCard = asyncHandler(async (req: Request, res: Response) => {
  const { _id } = req.body;
  const deletedCard = (await Card.find({ _id }))[0];
  const { image, audio } = deletedCard;

  const { words } = await Category.findById(deletedCard.category) as unknown as ICategory;

  await Category.findByIdAndUpdate(
    deletedCard.category,
    { words: words - 1 },
    { new: true },
  );

  await Card.findByIdAndDelete(_id);
  await v2.uploader.destroy(image);
  await v2.uploader.destroy(audio);

  res.status(200).json({ message: 'Deleted' });
});
