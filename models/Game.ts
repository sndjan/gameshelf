import { Schema, models, model } from "mongoose";

export interface IGame {
  name: string;
  description: string;
  rules?: string;
  players?: string;
  duration?: string;
  tags?: string[];
  decks?: string;
  difficulty?: string;
  imageUrl?: string;
  userId: string; // Reference to the user who added the game
  createdAt: Date;
  updatedAt: Date;
}

const gameSchema = new Schema<IGame>(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for the game"],
      maxlength: [100, "Name cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    rules: {
      type: String,
    },
    players: {
      type: String,
    },
    duration: {
      type: String,
    },
    tags: {
      type: [String],
    },
    decks: {
      type: String,
    },
    difficulty: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Check if the model already exists to prevent overwriting
export const Game = models.Game || model<IGame>("Game", gameSchema);
