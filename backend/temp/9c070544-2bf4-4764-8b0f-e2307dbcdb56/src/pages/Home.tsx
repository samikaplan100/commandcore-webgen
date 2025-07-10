import React, { useEffect, useState } from 'react';
import GameCard from '@/components/GameCard';

const Home: React.FC = () => {
  const [featuredGames, setFeaturedGames] = useState([]);

  useEffect(() => {
    // Fetch featured games from API
    fetch('/api/games/featured')
      .then(response => response.json())
      .then(data => setFeaturedGames(data));
  }, []);

  return (
    <div>
      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Featured Games</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredGames.map((game: any) => (
            <GameCard
              key={game.id}
              title={game.title}
              genre={game.genre}
              rating={game.rating}
              imageUrl={game.imageUrl}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;