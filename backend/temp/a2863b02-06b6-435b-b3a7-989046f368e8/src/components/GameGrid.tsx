import React from 'react';
import GameCard from './GameCard.tsx';

interface GameGridProps {
  games: Array<{
    id: string;
    title: string;
    image: string;
    price: number;
    rating: number;
  }>;
}

const GameGrid: React.FC<GameGridProps> = ({ games }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};

export default GameGrid;