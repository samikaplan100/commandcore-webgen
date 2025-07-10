import express from 'express';
import cors from 'cors';
import { router as gameRouter } from './routes/games';
import { router as userRouter } from './routes/users';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/games', gameRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});