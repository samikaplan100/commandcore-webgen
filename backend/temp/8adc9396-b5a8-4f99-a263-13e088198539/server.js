import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gameRoutes from './routes/games';
import authRoutes from './routes/auth';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});