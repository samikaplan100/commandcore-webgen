import React from 'react';
import { useSpeechRecognition } from 'react-speech-recognition';

const Header: React.FC = () => {
  const {
    transcript,
    finalTranscript,
    listening,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <div className="header">Jarvis AI - Speech Recognition Not Supported</div>;
  }

  return (
    <header className="header">
      <h1>Iron Man Jarvis Interface</h1>
      <div className="voice-input">
        <p>{listening ? 'Listening...' : 'Click to speak'}</p>
        <button onClick={() => listening ? null : startListening()}>
          {listening ? '...' : '🎤'}
        </button>
        <p>Transcript: {transcript}</p>
        <p>Final: {finalTranscript}</p>
      </div>
    </header>
  );
};

export default Header;