import React, { useEffect, useState } from 'react';
import { getGames } from '../utils/api';
import GameCard from '../components/GameCard';

const Home = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(response => setGames(response.data));
  }, []);

  return (
    <div className="home">
      <h1>🐧 Welcome to Penguin Gamers</h1>
      <div className="game-list">
        {games.map(game => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>
    </div>
  );
};

export default Home;