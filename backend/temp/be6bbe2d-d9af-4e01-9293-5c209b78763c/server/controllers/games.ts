import { Request, Response } from 'express';
import { Game } from '../../src/types/game';

const GAMES: Game[] = [
  {
    id: '1',
    title: 'Penguin Adventure',
    description: 'A thrilling adventure game with penguins.',
    thumbnail: 'https://via.placeholder.com/150',
    category: 'Action',
    releaseDate: '2023-04-01'
  },
  {
    id: '2',
    title: 'Snowy Showdown',
    description: 'Compete with penguins in winter sports.',
    thumbnail: 'https://via.placeholder.com/150',
    category: 'Sports',
    releaseDate: '2023-05-15'
  }
];

export const getAllGames = (_: Request, res: Response) => {
  res.json(GAMES);
};

export const getGameById = (req: Request, res: Response) => {
  const game = GAMES.find(g => g.id === req.params.id);
  if (game) {
    res.json(game);
  } else {
    res.status(404).json({ error: 'Game not found' });
  }
};