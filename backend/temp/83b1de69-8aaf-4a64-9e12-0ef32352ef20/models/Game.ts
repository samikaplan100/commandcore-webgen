import mongoose, { Document, Schema } from 'mongoose';

export interface IGame extends Document {
  title: string;
  genre: string;
  releaseDate: Date;
  rating: number;
  penguinScore: number;
}

const GameSchema: Schema = new Schema({
  title: { type: String, required: true },
  genre: { type: String, required: true },
  releaseDate: { type: Date, default: Date.now },
  rating: { type: Number, min: 0, max: 10 },
  penguinScore: { type: Number, min: 0, max: 100 }
});

export const Game = mongoose.model<IGame>('Game', GameSchema);