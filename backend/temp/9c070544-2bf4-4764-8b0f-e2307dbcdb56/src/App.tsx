import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import Games from '@/pages/Games';
import Profile from '@/pages/Profile';
import Forum from '@/pages/Forum';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forum" element={<Forum />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
};

export default App;