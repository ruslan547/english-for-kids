import { model, Schema } from 'mongoose';

export interface ICard {
  _id?: string;
  word: string;
  translation: string;
  image: string;
  audio: string;
  category: string;
}

const cardSchema = new Schema({
  word: {
    type: String,
  },
  translation: {
    type: String,
  },
  image: {
    type: String,
  },
  audio: {
    type: String,
  },
  category: {
    type: String,
  },
});

export const Card = model<ICard>('Card', cardSchema);
