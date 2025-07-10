import mongoose from 'mongoose';

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['action', 'adventure', 'strategy', 'simulation', 'sports'],
    required: true,
  },
  releaseDate: {
    type: Date,
    required: true,
  },
  platform: {
    type: String,
    enum: ['PC', 'Console', 'Mobile'],
    required: true,
  },
  developer: {
    type: String,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;