import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <p>© 2024 Stark Industries AI Assistant</p>
      <p>System Uptime: 99.98% | Last Updated: {new Date().toLocaleTimeString()}</p>
    </footer>
  );
};

export default Footer;