import { render, screen } from '@testing-library/react';
import App from '../App.jsx';

describe('App Component', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('renders header and footer', () => {
    fetch.mockResponseOnce(JSON.stringify([]));
    render(<App />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  test('displays error when API fails', async () => {
    fetch.mockReject(new Error('API Error'));
    render(<App />);
    
    expect(await screen.findByText('API Error')).toBeInTheDocument();
  });
});