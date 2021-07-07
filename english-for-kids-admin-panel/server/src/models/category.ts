import { model, Schema } from 'mongoose';

export interface ICategory {
  _id?: string;
  title: string;
  words: number;
}

const categorySchema = new Schema({
  title: {
    type: String,
  },
  words: {
    type: Number,
  },
});

export const Category = model<ICategory>('Category', categorySchema);
