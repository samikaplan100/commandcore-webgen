import express from 'express';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// API Endpoint
app.get('/api/data', (req, res) => {
  res.json({
    status: 'success',
    data: {
      energy: 87.3,
      security: 'GREEN',
      systemHealth: 'OPTIMAL',
      date: new Date().toISOString()
    }
  });
});

// Serve React App
app.use(express.static(path.join(__dirname, '../dist')));

// Handle React routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});