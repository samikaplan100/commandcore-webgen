import { render, screen } from '@testing-library/react';
import App from '../src/App.jsx';

describe('App Component', () => {
  it('should render the header', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  it('should render the dashboard', () => {
    render(<App />);
    expect(screen.getByText('Active Items')).toBeInTheDocument();
  });

  it('should render the footer', () => {
    render(<App />);
    expect(screen.getByText('©')).toBeInTheDocument();
  });
});