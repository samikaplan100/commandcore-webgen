import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  beforeEach(() => {
    render(<App />);
  });

  test('renders header', () => {
    expect(screen.getByText('J.A.R.V.I.S. Interface')).toBeInTheDocument();
  });

  test('displays status panel', () => {
    expect(screen.getByText('System Status')).toBeInTheDocument();
  });

  test('has voice assistant component', () => {
    expect(screen.getByPlaceholderText('Speak to JARVIS...')).toBeInTheDocument();
  });
});