import { model, Schema, Types } from 'mongoose';

export interface IToken {
  _id?: Types.ObjectId;
  username: string;
  token: string;
}

const tokenSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  token: {
    type: String,
    require: true,
  },
});

export const Token = model<IToken>('Token', tokenSchema);
