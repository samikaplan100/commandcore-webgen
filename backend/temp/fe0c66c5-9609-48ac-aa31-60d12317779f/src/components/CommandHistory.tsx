import React from 'react';

interface CommandHistoryProps {
  items: { command: string, response: string }[];
}

const CommandHistory: React.FC<CommandHistoryProps> = ({ items }) => {
  return (
    <div className="mt-4 overflow-y-auto max-h-64">
      {items.map((item, index) => (
        <div key={index} className="mb-2 p-2 bg-gray-800 rounded">
          <div className="font-bold">Command: {item.command}</div>
          <div className="text-sm">Response: {item.response}</div>
        </div>
      ))}
    </div>
  );
};

export default CommandHistory;