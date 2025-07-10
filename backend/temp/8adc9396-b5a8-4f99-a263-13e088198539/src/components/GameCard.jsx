import React from 'react';
import { Link } from 'react-router-dom';

const GameCard = ({ game }) => {
  return (
    <div className="game-card">
      <h3>{game.title}</h3>
      <p>{game.description.substring(0, 100)}...</p>
      <Link to={`/game/${game.id}`}>Play Now</Link>
    </div>
  );
};

export default GameCard;