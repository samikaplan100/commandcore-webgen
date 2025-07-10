import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Penguin Gamers Inc.</p>
      <div className={styles.links}>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </div>
    </footer>
  );
};

export default Footer;