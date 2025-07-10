import React, { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import GameList from './components/GameList.jsx';
import Footer from './components/Footer.jsx';
import { fetchGames } from './utils/api';
import './styles/App.css';

export default function App() {
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGames()
      .then(setGames)
      .catch(setError);
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        {error && <div className="error">{error.message}</div>}
        <GameList games={games} />
      </main>
      <Footer />
    </div>
  );
}