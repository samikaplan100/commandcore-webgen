import { fetchData } from '../src/utils/api.js';
import { STATUSES } from '../src/constants/config.js';

describe('API Tests', () => {
  it('should fetch active items', async () => {
    const data = await fetchData(STATUSES.ACTIVE);
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('should handle errors', async () => {
    await expect(fetchData('invalid')).rejects.toThrow();
  });
});