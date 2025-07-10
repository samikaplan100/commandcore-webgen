import React from 'react';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Vite React Fullstack</h1>
    </header>
  );
}