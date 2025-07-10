import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, LineController, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(LineElement, PointElement, LineController, Filler, Tooltip, Legend);

interface DashboardProps {
  data: any;
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ data, isLoading }) => {
  const chartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
    datasets: [
      {
        label: 'Energy Consumption',
        data: [75, 78, 85, 82, 79, 77],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  if (isLoading) {
    return <div className="dashboard">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <div className="status-card">
        <h3>System Status</h3>
        <p>Security: <span className="status-green">{data?.security}</span></p>
        <p>Energy: <span>{data?.energy}%</span></p>
      </div>
      <div className="chart-container">
        <h3>24-Hour Energy Usage</h3>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default Dashboard;