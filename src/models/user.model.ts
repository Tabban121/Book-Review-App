// src/models/user.model.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  email: string;
  password: string;
  // add other fields as needed
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true },
  password: { type: String, required: true },
  // add other fields
});

export const User = mongoose.model<UserDocument>('User', userSchema);
