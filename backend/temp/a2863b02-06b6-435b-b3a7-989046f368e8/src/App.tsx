import React from 'react';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import GameGrid from './components/GameGrid.tsx';
import { useGames } from './hooks/useGames.ts';

const App: React.FC = () => {
  const { games, loading, error } = useGames();

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Header />
      <main className="container mx-auto p-4">
        {loading && <p className="text-center text-2xl">Loading games...</p>}
        {error && <p className="text-center text-red-500">Error loading games</p>}
        <GameGrid games={games} />
      </main>
      <Footer />
    </div>
  );
};

export default App;