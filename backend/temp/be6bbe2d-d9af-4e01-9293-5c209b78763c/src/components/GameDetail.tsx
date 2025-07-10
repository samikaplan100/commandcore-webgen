import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Game } from '../types/game';
import { fetchGameById } from '../utils/api';

const GameDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (id) {
      fetchGameById(id).then(setGame);
    }
  }, [id]);

  if (!game) return <div>Loading...</div>;

  return (
    <div className="game-detail">
      <h2>{game.title}</h2>
      <p>{game.description}</p>
      <img src={game.thumbnail} alt={game.title} />
    </div>
  );
};

export default GameDetail;