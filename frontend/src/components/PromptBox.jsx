import { useState } from 'react';
import axios from 'axios';

export default function PromptBox({ onResponse }) {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const SparklesIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  );

  const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/>
      <polygon points="22,2 15,22 11,13 2,9 22,2"/>
    </svg>
  );

  const LoaderIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-spin">
      <path d="M21 12a9 9 0 11-6.219-8.56"/>
    </svg>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/generate', {
        prompt: input,
      });

      const files = res.data?.files || [];
      const contents = res.data?.contents || {};
      const sessionId = res.data?.sessionId || '';
      const previewUrl = res.data?.previewUrl || '';
      const installResult = res.data?.installResult || '';
      const serverResult = res.data?.serverResult || '';
      onResponse({ files, contents, sessionId, previewUrl, installResult, serverResult });
    } catch (err) {
      console.error('API error:', err.response?.data || err.message);
      // You could add a toast notification here
    }

    setInput('');
    setLoading(false);
  };

  return (
    <div style={{
      borderTop: '1px solid #30363d',
      backgroundColor: '#161b22',
      padding: 16
    }}>
      <form onSubmit={handleSubmit}>
        <div style={{
          display: 'flex',
          gap: 12,
          alignItems: 'flex-end',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <div style={{
              position: 'absolute',
              left: 12,
              top: 12,
              color: '#8b949e'
            }}>
              <SparklesIcon />
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe what you want to build... (e.g., 'Create a React todo app with dark mode')"
              style={{
                width: '100%',
                minHeight: '60px',
                maxHeight: '120px',
                padding: '12px 12px 12px 40px',
                border: '1px solid #30363d',
                borderRadius: 8,
                backgroundColor: '#0d1117',
                color: '#c9d1d9',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#58a6ff';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#30363d';
              }}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !input.trim()}
            style={{
              padding: '12px 20px',
              backgroundColor: loading || !input.trim() ? '#21262d' : '#238636',
              color: loading || !input.trim() ? '#8b949e' : '#ffffff',
              border: 'none',
              borderRadius: 8,
              cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              transition: 'all 0.2s ease',
              minWidth: '100px',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              if (!loading && input.trim()) {
                e.target.style.backgroundColor = '#2ea043';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading && input.trim()) {
                e.target.style.backgroundColor = '#238636';
              }
            }}
          >
            {loading ? (
              <>
                <LoaderIcon />
                Generating...
              </>
            ) : (
              <>
                <SendIcon />
                Generate
              </>
            )}
          </button>
        </div>
      </form>
      
      {/* Tips */}
      <div style={{
        marginTop: 12,
        textAlign: 'center'
      }}>
        <p style={{
          color: '#8b949e',
          fontSize: '12px',
          margin: 0
        }}>
          💡 Try: "Create a landing page", "Build a calculator app", "Make a weather widget"
        </p>
      </div>
    </div>
  );
}
