import React from 'react';

interface GameCardProps {
  title: string;
  genre: string;
  rating: number;
  imageUrl: string;
}

const GameCard: React.FC<GameCardProps> = ({ title, genre, rating, imageUrl }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-penguin-500 mb-1">Genre: {genre}</p>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{rating.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
};

export default GameCard;