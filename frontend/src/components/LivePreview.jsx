import { useState, useEffect, useRef } from 'react';

export default function LivePreview({ files, contents, activeFile, sessionId, previewUrl, installResult, serverResult }) {
  const [terminalOutput, setTerminalOutput] = useState([]);
  const [buildStatus, setBuildStatus] = useState('idle'); // idle, building, success, error
  const [iframeKey, setIframeKey] = useState(0);
  const iframeRef = useRef(null);

  // Update terminal output when new results come in
  useEffect(() => {
    if (installResult) {
      setTerminalOutput(prev => [...prev, { 
        type: 'info', 
        message: '📦 Installing dependencies...' 
      }]);
      
      if (installResult.includes('successfully')) {
        setTerminalOutput(prev => [...prev, { 
          type: 'success', 
          message: `✅ ${installResult}` 
        }]);
      } else {
        setTerminalOutput(prev => [...prev, { 
          type: 'error', 
          message: `❌ ${installResult}` 
        }]);
      }
    }

    if (serverResult) {
      setTerminalOutput(prev => [...prev, { 
        type: 'info', 
        message: '🚀 Starting development server...' 
      }]);
      
      if (serverResult.includes('started') || serverResult.includes('running')) {
        setTerminalOutput(prev => [...prev, { 
          type: 'success', 
          message: `✅ ${serverResult}` 
        }]);
        setBuildStatus('success');
      } else {
        setTerminalOutput(prev => [...prev, { 
          type: 'error', 
          message: `❌ ${serverResult}` 
        }]);
        setBuildStatus('error');
      }
    }
  }, [installResult, serverResult]);

  // Update build status based on preview URL
  useEffect(() => {
    if (previewUrl) {
      setBuildStatus('success');
      setIframeKey(prev => prev + 1); // Force iframe refresh
    } else if (files.length > 0 && !previewUrl) {
      setBuildStatus('error');
    }
  }, [previewUrl, files.length]);

  // Generate static preview for non-server projects
  useEffect(() => {
    if (!files.length) {
      setBuildStatus('idle');
      return;
    }

    // If we have a real preview URL, don't generate static preview
    if (previewUrl) {
      return;
    }

    // Check if this is a modern project that needs a dev server
    const needsDevServer = files.some(f => 
      f.includes('package.json') || 
      f.includes('.jsx') || 
      f.includes('.tsx') ||
      Object.values(contents).some(content => 
        content.includes('import ') || 
        content.includes('export ') ||
        content.includes('import React') ||
        content.includes('export default')
      )
    );

    if (needsDevServer) {
      setBuildStatus('error');
      return;
    }

    // For static files, generate preview HTML
    const htmlFile = files.find(file => file.endsWith('.html'));
    const cssFiles = files.filter(file => file.endsWith('.css'));
    const jsFiles = files.filter(file => file.endsWith('.js'));

    if (htmlFile) {
      let htmlContent = contents[htmlFile] || '';
      
      // Inject CSS files
      cssFiles.forEach(cssFile => {
        const cssContent = contents[cssFile] || '';
        const cssLink = `<style>\n${cssContent}\n</style>`;
        
        if (htmlContent.includes('</head>')) {
          htmlContent = htmlContent.replace('</head>', `${cssLink}\n</head>`);
        } else if (htmlContent.includes('<head>')) {
          htmlContent = htmlContent.replace('<head>', `<head>\n${cssLink}`);
        } else {
          htmlContent = cssLink + '\n' + htmlContent;
        }
      });

      // Inject JavaScript files (only vanilla JS, not ES modules)
      jsFiles.forEach(jsFile => {
        const jsContent = contents[jsFile] || '';
        // Skip files with import/export statements
        if (jsContent.includes('import ') || jsContent.includes('export ')) {
          return;
        }
        const scriptTag = `<script>\n${jsContent}\n</script>`;
        
        if (htmlContent.includes('</body>')) {
          htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
        } else {
          htmlContent += '\n' + scriptTag;
        }
      });

      // Update iframe with static content
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(htmlContent);
        doc.close();
      }
      
      setBuildStatus('success');
    } else {
      // Create basic HTML structure for non-HTML projects
      let combinedContent = '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>Preview</title>\n';
      
      cssFiles.forEach(cssFile => {
        const cssContent = contents[cssFile] || '';
        combinedContent += `<style>\n${cssContent}\n</style>\n`;
      });
      
      combinedContent += '</head>\n<body>\n';
      
      // Only include vanilla JS files
      const vanillaJSFiles = jsFiles.filter(jsFile => {
        const jsContent = contents[jsFile] || '';
        return !jsContent.includes('import ') && !jsContent.includes('export ');
      });
      
      vanillaJSFiles.forEach(jsFile => {
        const jsContent = contents[jsFile] || '';
        combinedContent += `<script>\n${jsContent}\n</script>\n`;
      });
      
      combinedContent += '</body>\n</html>';
      
      // Update iframe with static content
      if (iframeRef.current) {
        const iframe = iframeRef.current;
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        doc.open();
        doc.write(combinedContent);
        doc.close();
      }
      
      setBuildStatus('success');
    }
  }, [files, contents, previewUrl]);

  const getFileType = (filename) => {
    if (!filename) return '';
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'html': return 'HTML';
      case 'css': return 'CSS';
      case 'js': return 'JavaScript';
      case 'jsx': return 'React';
      case 'ts': return 'TypeScript';
      case 'tsx': return 'React TS';
      case 'json': return 'JSON';
      default: return ext?.toUpperCase() || '';
    }
  };

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  const getProjectType = () => {
    if (files.some(f => f.includes('package.json'))) {
      if (files.some(f => f.includes('jsx') || contents[f]?.includes('React'))) {
        return 'React';
      } else if (files.some(f => f.includes('vue') || contents[f]?.includes('Vue'))) {
        return 'Vue';
      } else {
        return 'Node.js';
      }
    }
    return 'Static';
  };

  return (
    <div style={{ 
      width: '30%', 
      borderLeft: '1px solid #30363d', 
      backgroundColor: '#0d1117',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Preview Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #30363d',
        backgroundColor: '#161b22',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        <h3 style={{ 
          margin: 0, 
          color: '#f0f6fc',
          fontSize: '14px',
          fontWeight: '600'
        }}>
          Live Preview
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {buildStatus === 'building' && (
            <span style={{ 
              color: '#d29922', 
              fontSize: '12px',
              backgroundColor: '#21262d',
              padding: '2px 6px',
              borderRadius: 4
            }}>
              🔄 Building
            </span>
          )}
          {buildStatus === 'success' && (
            <span style={{ 
              color: '#3fb950', 
              fontSize: '12px',
              backgroundColor: '#21262d',
              padding: '2px 6px',
              borderRadius: 4
            }}>
              ✅ Ready
            </span>
          )}
          {buildStatus === 'error' && (
            <span style={{ 
              color: '#f85149', 
              fontSize: '12px',
              backgroundColor: '#21262d',
              padding: '2px 6px',
              borderRadius: 4
            }}>
              ❌ Error
            </span>
          )}
          {activeFile && (
            <span style={{ 
              color: '#8b949e', 
              fontSize: '12px',
              textTransform: 'uppercase',
              backgroundColor: '#21262d',
              padding: '2px 6px',
              borderRadius: 4
            }}>
              {getFileType(activeFile)}
            </span>
          )}
        </div>
      </div>

      {/* Terminal */}
      <div style={{
        height: '150px',
        backgroundColor: '#0d1117',
        borderBottom: '1px solid #30363d',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '8px 12px',
          backgroundColor: '#161b22',
          borderBottom: '1px solid #30363d',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <span style={{ color: '#f0f6fc', fontSize: '12px', fontWeight: '500' }}>Terminal</span>
          <button
            onClick={clearTerminal}
            style={{
              background: 'none',
              border: 'none',
              color: '#8b949e',
              cursor: 'pointer',
              fontSize: '12px',
              padding: '2px 6px',
              borderRadius: 4
            }}
          >
            Clear
          </button>
        </div>
        <div style={{
          flex: 1,
          padding: '8px 12px',
          overflowY: 'auto',
          fontFamily: 'Monaco, Consolas, monospace',
          fontSize: '11px',
          lineHeight: '1.4'
        }}>
          {terminalOutput.length === 0 ? (
            <span style={{ color: '#8b949e' }}>Ready to build...</span>
          ) : (
            terminalOutput.map((output, index) => (
              <div key={index} style={{
                color: output.type === 'error' ? '#f85149' : 
                       output.type === 'success' ? '#3fb950' : 
                       output.type === 'command' ? '#58a6ff' : 
                       output.type === 'info' ? '#d29922' : '#c9d1d9',
                marginBottom: '2px'
              }}>
                {output.message}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Preview Content */}
      <div style={{ flex: 1, position: 'relative' }}>
        {files.length === 0 ? (
          <div style={{ 
            padding: 16, 
            backgroundColor: '#161b22', 
            borderRadius: 6,
            border: '1px solid #30363d',
            margin: 16,
            textAlign: 'center'
          }}>
            <p style={{ color: '#8b949e', fontSize: '14px', margin: 0 }}>
              Generate some code to see the preview
            </p>
          </div>
        ) : previewUrl ? (
          // Real server preview
          <div style={{ position: 'relative', height: '100%' }}>
            <div style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10,
              backgroundColor: '#3fb950',
              color: 'white',
              padding: '4px 8px',
              borderRadius: 4,
              fontSize: '10px',
              fontWeight: '500'
            }}>
              🟢 Live Server
            </div>
            <iframe
              ref={iframeRef}
              key={iframeKey}
              src={previewUrl}
              style={{
                width: '100%',
                height: '100%',
                border: 'none',
                backgroundColor: '#ffffff'
              }}
              title="Live Preview"
              sandbox="allow-scripts allow-forms allow-popups"
            />
          </div>
        ) : buildStatus === 'error' ? (
          <div style={{ 
            padding: 16, 
            backgroundColor: '#161b22', 
            borderRadius: 6,
            border: '1px solid #30363d',
            margin: 16,
            textAlign: 'center'
          }}>
            <p style={{ color: '#f85149', fontSize: '14px', margin: '0 0 8px 0' }}>
              ❌ Build Failed
            </p>
            <p style={{ color: '#8b949e', fontSize: '12px', margin: 0 }}>
              {files.some(f => f.includes('package.json') || f.includes('.jsx') || f.includes('.tsx')) 
                ? 'Project needs a dev server. AI did not provide one.'
                : 'Check the terminal for error details'
              }
            </p>
          </div>
        ) : (
          // Static preview
          <iframe
            ref={iframeRef}
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: '#ffffff'
            }}
            title="Static Preview"
            sandbox="allow-scripts"
          />
        )}
      </div>

      {/* Preview Footer */}
      <div style={{
        padding: '8px 16px',
        borderTop: '1px solid #30363d',
        backgroundColor: '#161b22',
        fontSize: '12px',
        color: '#8b949e'
      }}>
        {files.length > 0 ? (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>
              {files.length} file{files.length !== 1 ? 's' : ''} • {getProjectType()}
            </span>
            {previewUrl && (
              <span style={{ color: '#3fb950' }}>
                🟢 {previewUrl}
              </span>
            )}
          </div>
        ) : (
          <span>No files generated</span>
        )}
      </div>
    </div>
  );
} 