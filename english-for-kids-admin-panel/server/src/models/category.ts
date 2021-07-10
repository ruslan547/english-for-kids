import { model, Schema } from 'mongoose';

export interface ICategory {
  _id?: string;
  title: string;
  words: number;
  image: string;
}

const categorySchema = new Schema({
  title: {
    type: String,
  },
  words: {
    type: Number,
  },
  image: {
    type: String,
  },
});

export const Category = model<ICategory>('Category', categorySchema);
