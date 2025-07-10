import { useState, useEffect } from 'react';

interface Game {
  id: string;
  title: string;
  image: string;
  price: number;
  rating: number;
}

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/games`);
        if (!response.ok) throw new Error('Failed to fetch games');
        const data = await response.json();
        setGames(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  return { games, loading, error };
};

export default useGames;