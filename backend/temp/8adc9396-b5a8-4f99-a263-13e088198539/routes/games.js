import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/', async (req, res) => {
  const games = await prisma.game.findMany();
  res.json(games);
});

router.post('/', async (req, res) => {
  const { title, description, penguinType } = req.body;
  const game = await prisma.game.create({
    data: { title, description, penguinType }
  });
  res.status(201).json(game);
});

export default router;