import React, { useState, useEffect } from 'react';
import CommandInput from './CommandInput';
import CommandHistory from './CommandHistory';
import { sendCommand } from '../utils/api';

const VoiceAssistant: React.FC = () => {
  const [history, setHistory] = useState<{command: string, response: string}[]>([]);

  const handleCommand = async (command: string) => {
    const response = await sendCommand(command);
    setHistory([...history, { command, response }]);
  };

  return (
    <div className="bg-blue-900 rounded-lg p-4">
      <h2 className="text-xl mb-2">Voice Command</h2>
      <CommandInput onCommand={handleCommand} />
      <CommandHistory items={history} />
    </div>
  );
};

export default VoiceAssistant;