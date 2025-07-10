import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders header with logo', () => {
  render(<App />);
  const header = screen.getByText(/Penguin Gamers/i);
  expect(header).toBeInTheDocument();
});

test('has navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  const profileLink = screen.getByText(/Profile/i);
  expect(homeLink).toBeInTheDocument();
  expect(profileLink).toBeInTheDocument();
});