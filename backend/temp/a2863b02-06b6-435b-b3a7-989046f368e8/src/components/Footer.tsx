import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-blue-900 text-white p-6 mt-12">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">🐧 Penguin Gamers</h2>
            <p className="text-sm opacity-80">Connecting penguin gamers worldwide since 2023</p>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="hover:underline">About</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/terms" className="hover:underline">Terms</a>
          </div>
        </div>
        <div className="border-t border-blue-700 mt-8 pt-4 text-sm opacity-60 text-center">
          © {new Date().getFullYear()} Penguin Gamers. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;