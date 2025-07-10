import React from 'react';

const StatusPanel: React.FC = () => {
  const status = {
    system: "Online",
    temperature: "22°C",
    battery: "98%",
    lastUpdate: new Date().toLocaleTimeString()
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-xl mb-2">System Status</h2>
      <ul className="space-y-2">
        <li><span className="font-bold">Status:</span> {status.system}</li>
        <li><span className="font-bold">Temperature:</span> {status.temperature}</li>
        <li><span className="font-bold">Battery:</span> {status.battery}</li>
        <li><span className="font-bold">Last Update:</span> {status.lastUpdate}</li>
      </ul>
    </div>
  );
};

export default StatusPanel;