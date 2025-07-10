import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SideMenu from '@/components/SideMenu';
import { useEffect } from 'react';

export default function App() {
  const location = useLocation();

  useEffect(() => {
    document.title = `Penguin Gamers - ${location.pathname
      .split('/')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')}`;
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SideMenu />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}