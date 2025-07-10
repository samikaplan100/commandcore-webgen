import request from 'supertest';
import app from '../server';

describe('GET /api/games', () => {
  it('should return all games', async () => {
    const res = await request(app).get('/api/games');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });
});

describe('GET /api/games/:id', () => {
  it('should return a specific game', async () => {
    const res = await request(app).get('/api/games/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('title', 'Penguin Adventure');
  });

  it('should return 404 for invalid ID', async () => {
    const res = await request(app).get('/api/games/999');
    expect(res.status).toBe(404);
  });
});