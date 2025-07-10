import React from 'react';
import styles from '../styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>🐧 Penguin Gamers</div>
      <nav>
        <a href="/">Home</a>
        <a href="/profile">Profile</a>
      </nav>
    </header>
  );
};

export default Header;