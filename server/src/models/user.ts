import { model, Schema, Types } from 'mongoose';

export interface IUser {
  _id?: Types.ObjectId;
  username: string;
  password: string;
}

const userSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

export const User = model<IUser>('User', userSchema);
