import { render, screen } from '@testing-library/react';
import ProductList from '../src/pages/ProductList';
import { fetchFeaturedProducts } from '../src/utils/api';

jest.mock('../src/utils/api');

describe('ProductList Component', () => {
  beforeEach(() => {
    fetchFeaturedProducts.mockResolvedValue([
      { id: 1, name: 'Test Product', price: 9.99 }
    ]);
  });

  it('renders product list', async () => {
    render(<ProductList />);
    expect(await screen.findByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('9.99')).toBeInTheDocument();
  });
});