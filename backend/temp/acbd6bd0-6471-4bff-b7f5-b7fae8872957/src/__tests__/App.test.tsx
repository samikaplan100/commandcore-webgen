import { render, screen } from '@testing-library/react'
import App from '../App'

test('renders main application components', () => {
  render(<App />)
  
  expect(screen.getByText('Penguin Gamers')).toBeInTheDocument()
  expect(screen.getByText('Game Hub')).toBeInTheDocument()
  expect(screen.getByText('Store')).toBeInTheDocument()
  expect(screen.getByText('Login')).toBeInTheDocument()
})