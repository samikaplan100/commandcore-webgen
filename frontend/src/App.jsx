import { useState } from 'react';
import FileTree from './components/FileTree';
import CodeEditor from './components/CodeEditor';
import PromptBox from './components/PromptBox';
import LivePreview from './components/LivePreview';

export default function App() {
  const [files, setFiles] = useState([]);
  const [contents, setContents] = useState({});
  const [activeFile, setActiveFile] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [installResult, setInstallResult] = useState('');
  const [serverResult, setServerResult] = useState('');

  const handleAIResponse = ({ files, contents, sessionId, previewUrl, installResult, serverResult }) => {
    setFiles(files);
    setContents(contents);
    setActiveFile(files[0] || '');
    setSessionId(sessionId || '');
    setPreviewUrl(previewUrl || '');
    setInstallResult(installResult || '');
    setServerResult(serverResult || '');
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      flexDirection: 'column',
      backgroundColor: '#0d1117',
      color: '#c9d1d9'
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 24px',
        borderBottom: '1px solid #30363d',
        backgroundColor: '#161b22'
      }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '24px', 
          fontWeight: '600',
          color: '#f0f6fc'
        }}>
          CommandCore
        </h1>
        <p style={{ 
          margin: '4px 0 0 0', 
          fontSize: '14px', 
          color: '#8b949e' 
        }}>
          AI-powered code generation platform
        </p>
      </div>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <FileTree files={files} active={activeFile} onSelect={setActiveFile} />
        <CodeEditor content={contents[activeFile]} filename={activeFile} />
        <LivePreview 
          files={files} 
          contents={contents} 
          activeFile={activeFile}
          sessionId={sessionId}
          previewUrl={previewUrl}
          installResult={installResult}
          serverResult={serverResult}
        />
      </div>
      <PromptBox onResponse={handleAIResponse} />
    </div>
  );
}
