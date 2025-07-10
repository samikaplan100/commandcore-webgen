import React from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="logo">
        <img src="/penguin-logo.png" alt="Penguin Games" />
        <h1>Penguin Gamers</h1>
      </div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/news">News</Link>
      </nav>
    </header>
  );
}