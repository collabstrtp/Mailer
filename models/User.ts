import mongoose, { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  password: string;
  emailAppPassword: string;
  isVerified?: boolean;
  resume: {
    url: string;
    fileName?: string;
  };
  coverLetter?: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    emailAppPassword: {
      type: String,
      required: true,
      select: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    resume: {
      url: {
        type: String, // cloudinary
        required: true,
      },
      fileName: {
        type: String,
      },
    },

    coverLetter: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUser>("User", UserSchema);
