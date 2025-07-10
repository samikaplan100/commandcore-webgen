export default function FileTree({ files, active, onSelect }) {
  const FileIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
      <polyline points="14,2 14,8 20,8"/>
    </svg>
  );

  const getFileType = (filename) => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js': return 'javascript';
      case 'jsx': return 'react';
      case 'ts': return 'typescript';
      case 'tsx': return 'react';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      default: return 'text';
    }
  };

  return (
    <div style={{ 
      width: '250px', 
      borderRight: '1px solid #30363d', 
      padding: 16,
      backgroundColor: '#161b22',
      overflowY: 'auto'
    }}>
      <h4 style={{ 
        margin: '0 0 16px 0', 
        color: '#f0f6fc',
        fontSize: '14px',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        Files ({files.length})
      </h4>
      {files.length === 0 ? (
        <div style={{ 
          color: '#8b949e', 
          fontSize: '14px',
          fontStyle: 'italic'
        }}>
          No files generated yet
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {files.map((file) => (
            <div
              key={file}
              onClick={() => onSelect(file)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: 6,
                backgroundColor: file === active ? '#21262d' : 'transparent',
                color: file === active ? '#f0f6fc' : '#c9d1d9',
                fontSize: '14px',
                transition: 'all 0.2s ease',
                border: file === active ? '1px solid #30363d' : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (file !== active) {
                  e.target.style.backgroundColor = '#21262d';
                }
              }}
              onMouseLeave={(e) => {
                if (file !== active) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <FileIcon />
              <span style={{ 
                fontWeight: file === active ? '600' : '400',
                color: file === active ? '#f0f6fc' : '#c9d1d9'
              }}>
                {file}
              </span>
              <span style={{ 
                marginLeft: 'auto',
                fontSize: '12px',
                color: '#8b949e',
                textTransform: 'uppercase'
              }}>
                {getFileType(file)}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
