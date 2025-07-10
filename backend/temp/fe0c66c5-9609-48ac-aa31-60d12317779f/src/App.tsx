import React from 'react';
import Header from './components/Header';
import VoiceAssistant from './components/VoiceAssistant';
import StatusPanel from './components/StatusPanel';
import './styles/global.css';

const App: React.FC = () => {
  return (
    <div className="jarvis-container">
      <Header />
      <main className="grid grid-cols-3 gap-4 p-4">
        <VoiceAssistant />
        <StatusPanel />
      </main>
    </div>
  );
};

export default App;