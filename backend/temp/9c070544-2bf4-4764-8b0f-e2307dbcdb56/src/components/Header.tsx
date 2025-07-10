import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-penguin-500 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">🐧 Penguin Gamers</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/games" className="hover:underline">Games</a></li>
            <li><a href="/profile" className="hover:underline">Profile</a></li>
            <li><a href="/forum" className="hover:underline">Forum</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;