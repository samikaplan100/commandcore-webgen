import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Get all games
router.get('/', async (req, res) => {
  const games = await prisma.game.findMany();
  res.json(games);
});

// Get featured games
router.get('/featured', async (req, res) => {
  const featuredGames = await prisma.game.findMany({
    where: { isFeatured: true },
    take: 6,
  });
  res.json(featuredGames);
});

export default router;