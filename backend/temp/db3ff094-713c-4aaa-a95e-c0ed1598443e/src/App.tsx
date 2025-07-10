import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import { fetchData } from './utils/api';

const App: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetchData('/api/data');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="app-container">
      <Header />
      <main>
        <Dashboard data={data} isLoading={isLoading} />
      </main>
      <Footer />
    </div>
  );
};

export default App;