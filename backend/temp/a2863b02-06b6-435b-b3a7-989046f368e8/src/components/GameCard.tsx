import React from 'react';
import { useNavigate } from 'react-router-dom';

interface GameCardProps {
  game: {
    id: string;
    title: string;
    image: string;
    price: number;
    rating: number;
  };
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg cursor-pointer transition-shadow"
      onClick={() => navigate(`/game/${game.id}`)}
    >
      <img src={game.image} alt={game.title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{game.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-green-400 font-bold">${game.price.toFixed(2)}</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < game.rating ? 'text-yellow-400' : 'text-gray-500'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;