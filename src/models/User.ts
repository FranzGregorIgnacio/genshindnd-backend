import mongoose, { Document, Model } from 'mongoose';

// Define the TypeScript interface for a User document
export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Define the schema
const UserSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Create the model
const User: Model<IUser> = mongoose.model<IUser>('User', UserSchema);

export default User;
