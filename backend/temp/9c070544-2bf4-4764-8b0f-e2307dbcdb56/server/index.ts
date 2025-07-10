import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import gameRoutes from './routes/games';

const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/games', gameRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});