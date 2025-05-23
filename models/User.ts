import mongoose, { Document, Schema, Types } from "mongoose";

export interface IUser extends Document {
  email: string;
  favorites: Types.ObjectId[];
  games: Types.ObjectId[];
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true },
  favorites: [{ type: Schema.Types.ObjectId, ref: "Game" }],
  games: [{ type: Schema.Types.ObjectId, ref: "Game" }],
});

export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
