import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="app-header">
      <h1>Penguin Gamers</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/games">Game List</a>
      </nav>
    </header>
  );
};

export default Header;