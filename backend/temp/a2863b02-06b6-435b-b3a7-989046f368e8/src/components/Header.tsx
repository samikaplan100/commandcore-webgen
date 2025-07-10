import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">🐧 Penguin Gamers</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/games" className="hover:text-white">Games</a></li>
            <li><a href="/community" className="hover:text-white">Community</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;