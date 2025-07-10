import { Editor } from '@monaco-editor/react';
import { useState } from 'react';

export default function CodeEditor({ content, filename }) {
  const [editorContent, setEditorContent] = useState(content || '');

  // Update content when prop changes
  if (content !== editorContent && content !== undefined) {
    setEditorContent(content);
  }

  const getLanguage = (filename) => {
    if (!filename) return 'plaintext';
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'js': return 'javascript';
      case 'jsx': return 'javascript';
      case 'ts': return 'typescript';
      case 'tsx': return 'typescript';
      case 'html': return 'html';
      case 'css': return 'css';
      case 'json': return 'json';
      case 'md': return 'markdown';
      case 'py': return 'python';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      case 'c': return 'c';
      case 'php': return 'php';
      case 'rb': return 'ruby';
      case 'go': return 'go';
      case 'rs': return 'rust';
      case 'swift': return 'swift';
      case 'kt': return 'kotlin';
      default: return 'plaintext';
    }
  };

  return (
    <div style={{ 
      flex: 1, 
      display: 'flex', 
      flexDirection: 'column',
      backgroundColor: '#0d1117'
    }}>
      {/* Editor Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #30363d',
        backgroundColor: '#161b22',
        display: 'flex',
        alignItems: 'center',
        gap: 8
      }}>
        <span style={{ 
          color: '#f0f6fc', 
          fontSize: '14px',
          fontWeight: '500'
        }}>
          {filename || 'No file selected'}
        </span>
        {filename && (
          <span style={{ 
            color: '#8b949e', 
            fontSize: '12px',
            textTransform: 'uppercase',
            backgroundColor: '#21262d',
            padding: '2px 6px',
            borderRadius: 4
          }}>
            {getLanguage(filename)}
          </span>
        )}
      </div>

      {/* Monaco Editor */}
      <div style={{ flex: 1 }}>
        <Editor
          height="100%"
          language={getLanguage(filename)}
          value={editorContent}
          onChange={(value) => setEditorContent(value || '')}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            renderLineHighlight: 'all',
            selectOnLineNumbers: true,
            glyphMargin: true,
            useTabStops: false,
            fontSize: 14,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            trimAutoWhitespace: true,
            largeFileOptimizations: true,
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showClasses: true,
              showFunctions: true,
              showVariables: true,
              showModules: true,
              showProperties: true,
              showEvents: true,
              showOperators: true,
              showUnits: true,
              showValues: true,
              showConstants: true,
              showEnums: true,
              showEnumMembers: true,
              showColors: true,
              showFiles: true,
              showReferences: true,
              showFolders: true,
              showTypeParameters: true,
              showWords: true,
              showUsers: true,
              showIssues: true,
            }
          }}
        />
      </div>
    </div>
  );
}
