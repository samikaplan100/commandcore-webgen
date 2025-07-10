import React from 'react'
import './Header.css'

const Header: React.FC = () => {
  return (
    <header className="penguin-header">
      <div className="logo">🐧 Penguin Gamers</div>
      <nav>
        <a href="/">Game Hub</a>
        <a href="/store">Store</a>
        <a href="/login">Login</a>
      </nav>
    </header>
  )
}

export default Header