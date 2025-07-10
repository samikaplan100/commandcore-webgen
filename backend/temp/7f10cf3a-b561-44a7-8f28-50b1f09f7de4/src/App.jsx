import React from 'react';
import Header from './components/Header.jsx';
import Dashboard from './components/Dashboard.jsx';
import Footer from './components/Footer.jsx';
import './styles/global.css';

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}