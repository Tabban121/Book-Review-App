import mongoose from "mongoose";
import {Types} from 'mongoose';


export interface IUser{
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export const User = mongoose.model<IUser>('User', userSchema);
