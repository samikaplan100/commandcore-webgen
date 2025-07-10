import request from 'supertest';
import app from '../server';

describe('Product Routes', () => {
  beforeEach(() => {
    // Setup test data
  });

  it('should fetch featured products', async () => {
    const res = await request(app).get('/api/products/featured');
    expect(res.status).toBe