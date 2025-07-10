import React, { useEffect, useState } from 'react';
import { Game } from '../types/game';
import { fetchGames } from '../utils/api';

const GameList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetchGames().then(setGames);
  }, []);

  return (
    <div className="game-list">
      <h2>Available Games</h2>
      <ul>
        {games.map(game => (
          <li key={game.id}>
            <a href={`/games/${game.id}`}>{game.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;