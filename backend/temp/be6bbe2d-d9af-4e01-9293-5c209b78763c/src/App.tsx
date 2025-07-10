import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GameList from './components/GameList';
import GameDetail from './components/GameDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<GameList />} />
        <Route path="/games/:id" element={<GameDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;