import { Schema, model, models } from "mongoose";

export interface IGame {
  name: string;
  description: string;
  rules: string;
  players: string;
  duration: string;
  decks: string;
  difficulty: string;
  tags?: string[];
  userId: string;
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
      required: [true, "Please provide rules"],
    },
    players: {
      type: String,
      required: [true, "Please provide players information"],
    },
    duration: {
      type: String,
      required: [true, "Please provide duration"],
    },
    decks: {
      type: String,
      required: [true, "Please provide decks information"],
    },
    difficulty: {
      type: String,
      required: [true, "Please provide difficulty level"],
    },
    tags: {
      type: [String],
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

export const Game = models.Game || model<IGame>("Game", gameSchema);
