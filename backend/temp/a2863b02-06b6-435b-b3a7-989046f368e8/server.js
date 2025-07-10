import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import gameRoutes from './routes/games.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/games', gameRoutes);
app.use('/api/auth', authRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});