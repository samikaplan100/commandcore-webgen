import React, { useState } from 'react';

interface CommandInputProps {
  onCommand: (command: string) => void;
}

const CommandInput: React.FC<CommandInputProps> = ({ onCommand }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Speak to JARVIS..."
        className="w-full p-2 rounded"
      />
      <button type="submit" className="mt-2 bg-green-500 text-white p-2 rounded">
        Send
      </button>
    </form>
  );
};

export default CommandInput;