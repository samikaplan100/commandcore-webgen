import express from 'express';
import { getGames, createGame, getGameById } from '../controllers/games.js';

const router = express.Router();

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Get all games
 *     responses:
 *       200:
 *         description: List of games
 */
router.get('/', getGames);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Create a new game
 *     parameters:
 *       - name: title
 *         in: body
 *         required: true
 *     responses:
 *       201:
 *         description: Game created successfully
 */
router.post('/', createGame);

router.get('/:id', getGameById);

export default router;