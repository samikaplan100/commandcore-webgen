const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');
const { v4: uuidv4 } = require('uuid');

const app = express();

// Enable CORS for Vercel and all origins (for public API)
app.use(cors({
  origin: [
    'https://commandcore-webgen.vercel.app',
    'https://commandcore-webgen.onrender.com',
    'http://localhost:5173',
    '*'
  ],
  credentials: true,
}));
app.use(express.json());

// Session management
const sessions = new Map();
const TEMP_DIR = path.join(__dirname, 'temp');
const PORT_RANGE = { start: 3000, end: 4000 };
let nextPort = PORT_RANGE.start;

// Ensure temp directory exists
fs.ensureDirSync(TEMP_DIR);

// Get next available port
function getNextPort() {
  const port = nextPort;
  nextPort = nextPort >= PORT_RANGE.end ? PORT_RANGE.start : nextPort + 1;
  return port;
}

// Update Vite config to use the assigned port
function updateViteConfigPort(fileMap, port) {
  if (fileMap['/vite.config.js']) {
    const config = fileMap['/vite.config.js'];
    // Replace any hardcoded port with the assigned port
    const updatedConfig = config.replace(/port:\s*\d+/, `port: ${port}`);
    return updatedConfig;
  }
  return fileMap['/vite.config.js'];
}

// Find available port starting from base port
async function findAvailablePort(basePort) {
  const net = require('net');
  
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.listen(basePort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    
    server.on('error', () => {
      resolve(findAvailablePort(basePort + 1));
    });
  });
}

// Clean up old sessions
function cleanupOldSessions() {
  const maxAge = 30 * 60 * 1000; // 30 minutes
  const now = Date.now();
  
  for (const [sessionId, session] of sessions.entries()) {
    if (now - session.createdAt > maxAge) {
      cleanupSession(sessionId);
    }
  }
}

// Clean up a session
function cleanupSession(sessionId) {
  const session = sessions.get(sessionId);
  if (session) {
    // Kill the process if it's running
    if (session.process && !session.process.killed) {
      session.process.kill('SIGTERM');
    }
    
    // Remove the directory
    const sessionDir = path.join(TEMP_DIR, sessionId);
    fs.removeSync(sessionDir, { force: true });
    
    // Remove from sessions map
    sessions.delete(sessionId);
    
    console.log(`Cleaned up session: ${sessionId}`);
  }
}

// Parse AI response into files
function parseAIResponse(content) {
  console.log('Starting to parse AI response...');
  console.log(`Content length: ${content.length} characters`);
  
  const fileMap = {};
  const lines = content.split('\n');
  
  console.log(`Split content into ${lines.length} lines`);

  let currentFile = null;
  let collecting = false;
  let buffer = [];
  let fileCount = 0;
  let outerCodeBlock = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for file headers like "### /filename.ext" or "### File: /filename.ext"
    const headerMatch = line.match(/^###\s*(?:File:\s*)?\/?([a-zA-Z0-9_\-\/\.]+\.([jt]sx?|html|css|json|md|py|java|cpp|c|php|rb|go|rs|swift|kt|yml|yaml|env|gitignore|txt|xml|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot))$/i);

    if (headerMatch) {
      console.log(`Found file header at line ${i}: "${line}" -> "${headerMatch[1]}"`);
    }

    // Check for code block start
    if (line.startsWith('```')) {
      if (!collecting) {
        collecting = true;
        buffer = [];
        // Check if this is an outer code block (no file header before it)
        if (i === 0 || !lines.slice(0, i).some(l => l.trim().match(/^###\s*(?:File:\s*)?\/?[a-zA-Z0-9_\-\/\.]+\.([jt]sx?|html|css|json|md|py|java|cpp|c|php|rb|go|rs|swift|kt|yml|yaml|env|gitignore|txt|xml|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/i))) {
          outerCodeBlock = true;
          console.log(`Started collecting outer code block at line ${i}`);
        } else {
          console.log(`Started collecting code block at line ${i}`);
        }
      } else {
        collecting = false;
        if (currentFile && buffer.length > 0) {
          fileMap['/' + currentFile] = buffer.join('\n').trim();
          fileCount++;
          console.log(`Finished collecting file: /${currentFile} (${buffer.length} lines)`);
        }
        currentFile = null;
        if (outerCodeBlock) {
          console.log(`Stopped collecting outer code block at line ${i}`);
          outerCodeBlock = false;
        } else {
          console.log(`Stopped collecting code block at line ${i}`);
        }
      }
      continue;
    }

    // If we find a file header, set the current file (regardless of collecting state)
    if (headerMatch) {
      currentFile = headerMatch[1].replace(/^\/+/, '');
      console.log(`Set current file to: ${currentFile}`);
    } else if (collecting) {
      buffer.push(lines[i]);
    }
  }

  // Handle any remaining buffer
  if (collecting && currentFile && buffer.length > 0) {
    fileMap['/' + currentFile] = buffer.join('\n').trim();
    fileCount++;
    console.log(`Finished collecting final file: /${currentFile} (${buffer.length} lines)`);
  }

  console.log(`Parsing complete. Found ${fileCount} files.`);
  return fileMap;
}

// Create proper HTML entry point for React/JSX projects
function createReactEntryPoint(fileMap) {
  const hasReact = Object.keys(fileMap).some(file => 
    file.includes('jsx') || file.includes('tsx') || 
    fileMap[file]?.includes('React') || fileMap[file]?.includes('react')
  );

  if (hasReact) {
    // Create a simple HTML that can run React code
    const reactHtml = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        #root { padding: 20px; }
    </style>
</head>
<body>
    <div id="root"></div>
    
    <script type="text/babel">
        // React component will be injected here
        ${Object.entries(fileMap)
          .filter(([file]) => file.includes('jsx') || file.includes('tsx'))
          .map(([file, content]) => content)
          .join('\n\n')}
        
        // Render the app
        const root = ReactDOM.createRoot(document.getElementById('root'));
        const App = window.App || (() => <div>React App Loaded</div>);
        root.render(<App />);
    </script>
</body>
</html>`;
    
    return reactHtml;
  }
  
  return null;
}

// Create simple HTML for static projects
function createStaticHTML(fileMap) {
  const cssFiles = Object.entries(fileMap).filter(([file]) => file.endsWith('.css'));
  const jsFiles = Object.entries(fileMap).filter(([file]) => file.endsWith('.js'));
  const htmlFiles = Object.entries(fileMap).filter(([file]) => file.endsWith('.html'));

  if (htmlFiles.length > 0) {
    // Use existing HTML file
    return htmlFiles[0][1];
  }

  // Create basic HTML structure
  let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated App</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
        ${cssFiles.map(([file, content]) => content).join('\n')}
    </style>
</head>
<body>
    <div id="app">
        <h1>Generated Application</h1>
        <p>Your app is running!</p>
    </div>
    
    <script>
        ${jsFiles.map(([file, content]) => content).join('\n')}
    </script>
</body>
</html>`;

  return html;
}

// Save files to disk
async function saveFilesToDisk(sessionId, fileMap) {
  const sessionDir = path.join(TEMP_DIR, sessionId);
  await fs.ensureDir(sessionDir);
  
  const savedFiles = [];
  const processedFiles = new Set(); // Track processed files to avoid duplicates
  
  // Check if this is a React project
  const hasReact = Object.keys(fileMap).some(file => 
    file.includes('jsx') || file.includes('tsx') || 
    fileMap[file]?.includes('React') || fileMap[file]?.includes('react')
  );

  // Create proper HTML entry point
  let htmlContent = null;
  if (hasReact) {
    htmlContent = createReactEntryPoint(fileMap);
  } else {
    htmlContent = createStaticHTML(fileMap);
  }

  // Save the HTML entry point
  if (htmlContent) {
    await fs.writeFile(path.join(sessionDir, 'index.html'), htmlContent, 'utf8');
    savedFiles.push('/index.html');
    processedFiles.add('/index.html');
    console.log('Created HTML entry point');
  }
  
  // Save all other files
  for (const [filePath, content] of Object.entries(fileMap)) {
    // Skip if already processed
    if (processedFiles.has(filePath)) {
      continue;
    }
    
    const fullPath = path.join(sessionDir, filePath);
    const dir = path.dirname(fullPath);
    
    await fs.ensureDir(dir);
    await fs.writeFile(fullPath, content, 'utf8');
    savedFiles.push(filePath);
    processedFiles.add(filePath);
    
    console.log(`Saved file: ${filePath}`);
  }
  
  return savedFiles;
}

// Install dependencies
async function installDependencies(sessionId) {
  const sessionDir = path.join(TEMP_DIR, sessionId);
  const packageJsonPath = path.join(sessionDir, 'package.json');
  
  if (!await fs.pathExists(packageJsonPath)) {
    console.log(`[npm install]: No package.json found in ${sessionDir}`);
    return { success: true, message: 'No package.json found' };
  }
  
  return new Promise((resolve) => {
    console.log(`[npm install]: Starting npm install for session: ${sessionId}`);
    console.log(`[npm install]: Working directory: ${sessionDir}`);
    
    // Try multiple approaches to find npm
    let npmPath = 'npm';
    if (process.platform === 'win32') {
      // Try common Windows npm locations
      const possiblePaths = [
        path.join(process.env.APPDATA || '', 'npm', 'npm.cmd'),
        path.join(process.env.APPDATA || '', 'npm', 'npm.ps1'),
        'npm.cmd',
        'npm'
      ];
      
      for (const path of possiblePaths) {
        try {
          require('child_process').execSync(`"${path}" --version`, { stdio: 'ignore' });
          npmPath = path;
          break;
        } catch (e) {
          // Continue to next path
        }
      }
    }
    
    console.log(`[npm install]: Using npm path: ${npmPath}`);
    
    const npm = spawn(npmPath, ['install', '--legacy-peer-deps', '--omit=dev'], {
      cwd: sessionDir,
      stdio: ['pipe', 'pipe', 'pipe'],
      shell: true // This helps with PATH issues on Windows
    });
    
    let output = '';
    let errorOutput = '';
    
    npm.stdout.on('data', (data) => {
      const dataStr = data.toString();
      output += dataStr;
      console.log(`[npm install]: ${dataStr.trim()}`);
    });
    
    npm.stderr.on('data', (data) => {
      const dataStr = data.toString();
      errorOutput += dataStr;
      console.error(`[npm install error]: ${dataStr.trim()}`);
    });
    
    npm.on('close', (code) => {
      console.log(`[npm install]: Process exited with code ${code}`);
      if (code === 0) {
        console.log(`[npm install]: Dependencies installed successfully for session: ${sessionId}`);
        resolve({ success: true, message: 'Dependencies installed successfully', output });
      } else {
        console.error(`[npm install]: Failed to install dependencies for session: ${sessionId}, exit code: ${code}`);
        resolve({ success: false, message: 'Failed to install dependencies', error: errorOutput });
      }
    });
    
    npm.on('error', (error) => {
      console.error(`[npm install]: Failed to run npm install for session: ${sessionId}`, error.message);
      resolve({ success: false, message: 'Failed to run npm install', error: error.message });
    });
  });
}

// Start development server
async function startDevServer(sessionId, port) {
  const sessionDir = path.join(TEMP_DIR, sessionId);
  const packageJsonPath = path.join(sessionDir, 'package.json');
  
  if (!await fs.pathExists(packageJsonPath)) {
    // For static projects, serve the HTML file directly
    const indexHtmlPath = path.join(sessionDir, 'index.html');
    if (await fs.pathExists(indexHtmlPath)) {
      return { success: true, message: 'Static HTML ready', isStatic: true };
    }
    return { success: false, message: 'No package.json or index.html found' };
  }
  
  const packageJson = await fs.readJson(packageJsonPath);
  const scripts = packageJson.scripts || {};
  
  // Check if any dev script exists
  if (!scripts.dev && !scripts.start && !scripts.serve) {
    return { success: false, message: 'No development script found in package.json' };
  }
  
  // Determine which script to run
  let scriptToRun = 'dev';
  if (scripts.dev) {
    scriptToRun = 'dev';
  } else if (scripts.start) {
    scriptToRun = 'start';
  } else if (scripts.serve) {
    scriptToRun = 'serve';
  }
  
  return new Promise((resolve) => {
    console.log(`[dev server]: Starting dev server for session: ${sessionId}`);
    console.log(`[dev server]: Working directory: ${sessionDir}`);
    console.log(`[dev server]: Running: npm run ${scriptToRun}`);
    
    const devProcess = spawn('npm', ['run', scriptToRun], {
      cwd: sessionDir,
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe']
    });
    
    let output = '';
    let errorOutput = '';
    let isResolved = false;
    let previewUrl = null;
    
    devProcess.stdout.on('data', (data) => {
      const dataStr = data.toString();
      output += dataStr;
      console.log(`[dev server]: ${dataStr.trim()}`);
      
      // Extract port from Vite output
      const localMatch = dataStr.match(/Local:\s*http:\/\/localhost:(\d+)/);
      if (localMatch && !isResolved) {
        const extractedPort = localMatch[1];
        previewUrl = `http://localhost:${extractedPort}`;
        console.log(`[dev server]: Extracted preview URL: ${previewUrl}`);
        isResolved = true;
        resolve({ 
          success: true, 
          message: 'Development server started', 
          process: devProcess, 
          output,
          previewUrl 
        });
      }
      
      // Fallback for other dev servers
      if (!isResolved && (dataStr.includes('Server running') || dataStr.includes('localhost:'))) {
        previewUrl = `http://localhost:${port}`;
        console.log(`[dev server]: Using fallback preview URL: ${previewUrl}`);
        isResolved = true;
        resolve({ 
          success: true, 
          message: 'Development server started', 
          process: devProcess, 
          output,
          previewUrl 
        });
      }
    });
    
    devProcess.stderr.on('data', (data) => {
      const dataStr = data.toString();
      errorOutput += dataStr;
      console.error(`[dev server error]: ${dataStr.trim()}`);
    });
    
    devProcess.on('close', (code) => {
      if (!isResolved) {
        console.error(`[dev server]: Process closed with code ${code}`);
        resolve({ 
          success: false, 
          message: 'Server process closed', 
          error: errorOutput,
          code 
        });
      }
    });
    
    devProcess.on('error', (error) => {
      if (!isResolved) {
        console.error(`[dev server]: Failed to start server: ${error.message}`);
        resolve({ 
          success: false, 
          message: 'Failed to start server', 
          error: error.message 
        });
      }
    });
    
    // Timeout after 30 seconds
    setTimeout(() => {
      if (!isResolved) {
        console.error(`[dev server]: Startup timeout after 30 seconds`);
        devProcess.kill('SIGTERM');
        resolve({ 
          success: false, 
          message: 'Server startup timeout', 
          error: 'Took too long to start' 
        });
      }
    }, 30000);
  });
}

// Serve static files for sessions
app.use('/session/:sessionId', express.static(path.join(TEMP_DIR)));

// The /generate route is already public; no auth or token checks are present.
app.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || !prompt.trim()) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // Generate session ID
    const sessionId = uuidv4();
    const port = getNextPort();
    
    console.log(`Starting new session: ${sessionId} on port ${port}`);

    // Enhanced prompt for better code generation
    const enhancedPrompt = `You are an expert software developer. Generate a COMPLEX, FULL-STACK application based on the following request. 

IMPORTANT REQUIREMENTS:
- Create MANY different file types (HTML, CSS, JS, JSX, TSX, JSON, MD, YAML, ENV, etc.)
- Include configuration files (package.json, tsconfig.json, vite.config.js, etc.)
- Add documentation files (README.md, CHANGELOG.md, API.md)
- Include test files (test.js, spec.js, __tests__/ folder)
- Add utility files (utils/, helpers/, constants/)
- Include multiple components/modules
- Use modern frameworks and libraries
- Add proper folder structure
- Include environment configuration
- Add build/deployment files

FORMAT YOUR RESPONSE EXACTLY AS FOLLOWS:
- Use "### /filename.ext" headers for each file
- Include complete code blocks with proper syntax highlighting
- Generate AT LEAST 10-15 different files
- Use proper folder structure (src/, components/, utils/, etc.)
- Include package.json with MANY dependencies
- Add configuration files for build tools
- Include documentation and README files
- Add test files and examples

EXAMPLES OF FILES TO INCLUDE:
- package.json (with many dependencies)
- README.md (comprehensive documentation)
- src/App.jsx (main React component)
- src/components/Header.jsx
- src/components/Footer.jsx
- src/utils/helpers.js
- src/constants/config.js
- src/styles/main.css
- src/styles/components.css
- public/index.html
- vite.config.js or webpack.config.js
- .env.example
- .gitignore
- tsconfig.json (if TypeScript)
- tests/App.test.js
- docs/API.md
- scripts/build.js
- scripts/deploy.js

Request: ${prompt}

Generate a COMPLEX, FULL-STACK application with MANY files:`;

    // Log the OpenRouter API key for debugging
    console.log("OPENROUTER_API_KEY:", process.env.OPENROUTER_API_KEY);
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'qwen/qwen3-32b',
        messages: [{ role: 'user', content: enhancedPrompt }],
        max_tokens: 4000,
        temperature: 0.7
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        },
        timeout: 60000 // Increased timeout to 60 seconds
      }
    );

    console.log('AI Response received:', {
      status: response.status,
      hasData: !!response.data,
      hasChoices: !!response.data?.choices,
      choicesLength: response.data?.choices?.length,
      hasMessage: !!response.data?.choices?.[0]?.message,
      hasContent: !!response.data?.choices?.[0]?.message?.content
    });

    const content = response.data?.choices?.[0]?.message?.content || '';

    if (!content.trim()) {
      console.error('Empty AI response:', {
        responseData: response.data,
        choices: response.data?.choices,
        message: response.data?.choices?.[0]?.message
      });
      return res.status(500).json({ 
        error: 'No content received from AI',
        details: 'AI response was empty or malformed',
        responseData: response.data
      });
    }

    console.log('AI Content length:', content.length);
    console.log('AI Content preview:', content.substring(0, 200) + '...');

    // Parse the response into files
    console.log('Parsing AI response into files...');
    const fileMap = parseAIResponse(content);
    
    console.log(`Parsed ${Object.keys(fileMap).length} files from AI response`);
    console.log('File keys found:', Object.keys(fileMap));
    
    if (Object.keys(fileMap).length === 0) {
      console.error('No files could be parsed from AI response');
      console.error('AI Content preview (first 500 chars):', content.substring(0, 500));
      console.error('AI Content preview (last 500 chars):', content.substring(Math.max(0, content.length - 500)));
      return res.status(500).json({ error: 'No files could be parsed from AI response' });
    }

    // Check if project needs a dev server
    const needsServer = needsDevServer(fileMap);
    console.log(`[main]: Project needs dev server: ${needsServer}`);
    
    if (needsServer) {
      // Create missing files for modern projects
      const packageJson = createPackageJsonIfNeeded(fileMap);
      if (packageJson) fileMap['/package.json'] = packageJson;
      
      const viteConfig = createViteConfigIfNeeded(fileMap);
      if (viteConfig) fileMap['/vite.config.js'] = viteConfig;
      
      // Update Vite config to use the assigned port
      fileMap['/vite.config.js'] = updateViteConfigPort(fileMap, port);
      
      const indexHtml = createViteIndexHtmlIfNeeded(fileMap);
      if (indexHtml) fileMap['/index.html'] = indexHtml;
      
      const mainJSX = createMainJSXIfNeeded(fileMap);
      if (mainJSX) fileMap['/src/main.jsx'] = mainJSX;
      
      // Save files to disk
      const savedFiles = await saveFilesToDisk(sessionId, fileMap);
      
      // Create session object
      const session = {
        id: sessionId,
        createdAt: Date.now(),
        port: port,
        files: savedFiles,
        process: null,
        status: 'created'
      };
      
      sessions.set(sessionId, session);

      // Install dependencies
      let installResult = { success: true, message: 'No dependencies to install' };
      if (fileMap['/package.json']) {
        installResult = await installDependencies(sessionId);
        if (!installResult.success) {
          session.status = 'install_failed';
          sessions.set(sessionId, session);
          return res.json({
            sessionId,
            files: savedFiles,
            contents: fileMap,
            installError: installResult.message,
            previewUrl: null
          });
        }
      }

      // Start development server
      let serverResult = { success: false, message: 'No server to start' };
      let previewUrl = null;
      
      console.log(`[main]: Starting dev server for session: ${sessionId}`);
      serverResult = await startDevServer(sessionId, port);
      console.log(`[main]: Dev server result:`, serverResult);
      if (serverResult.success) {
        session.process = serverResult.process;
        session.status = 'running';
        sessions.set(sessionId, session);
        previewUrl = serverResult.previewUrl || `http://localhost:${port}`;
      } else {
        session.status = 'server_failed';
        sessions.set(sessionId, session);
      }

      console.log(`Session ${sessionId} completed. Files: ${savedFiles.length}, Server: ${serverResult.success ? 'running' : 'failed'}`);

      res.json({
        sessionId,
        files: savedFiles,
        contents: fileMap,
        installResult: installResult.message,
        serverResult: serverResult.message,
        previewUrl,
        port
      });
    } else {
      // Static project - save files and serve directly
      const savedFiles = await saveFilesToDisk(sessionId, fileMap);
      
      // Create session object
      const session = {
        id: sessionId,
        createdAt: Date.now(),
        port: port,
        files: savedFiles,
        process: null,
        status: 'static'
      };
      
      sessions.set(sessionId, session);
      
      const previewUrl = `http://localhost:3001/session/${sessionId}/index.html`;

      console.log(`Static session ${sessionId} completed. Files: ${savedFiles.length}`);

      res.json({
        sessionId,
        files: savedFiles,
        contents: fileMap,
        installResult: 'No dependencies needed',
        serverResult: 'Static files ready',
        previewUrl,
        port: null
      });
    }



  } catch (err) {
    console.error('AI request failed:', err.response?.data || err.message);
    
    if (err.code === 'ECONNABORTED') {
      return res.status(408).json({ error: 'Request timeout - AI is taking too long to respond' });
    }
    
    if (err.response?.status === 429) {
      return res.status(429).json({ error: 'Rate limit exceeded' });
    }
    
    res.status(500).json({ 
      error: 'AI request failed', 
      details: err.response?.data?.error?.message || err.message 
    });
  }
});

// Get session status
app.get('/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  const session = sessions.get(sessionId);
  
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }
  
  res.json({
    sessionId: session.id,
    status: session.status,
    port: session.port,
    files: session.files,
    createdAt: session.createdAt,
    previewUrl: session.status === 'running' ? `http://localhost:${session.port}` : `http://localhost:3001/session/${sessionId}/index.html`
  });
});

// Kill session
app.delete('/session/:sessionId', (req, res) => {
  const { sessionId } = req.params;
  cleanupSession(sessionId);
  res.json({ message: 'Session cleaned up' });
});

// List all sessions
app.get('/sessions', (req, res) => {
  const sessionList = Array.from(sessions.values()).map(session => ({
    sessionId: session.id,
    status: session.status,
    port: session.port,
    files: session.files.length,
    createdAt: session.createdAt
  }));
  
  res.json({ sessions: sessionList });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    activeSessions: sessions.size,
    tempDir: TEMP_DIR
  });
});

// Cleanup old sessions every 5 minutes
setInterval(cleanupOldSessions, 5 * 60 * 1000);

// Check if project needs a dev server
function needsDevServer(fileMap) {
  const hasModernJS = Object.values(fileMap).some(content => 
    content.includes('import ') || 
    content.includes('export ') ||
    content.includes('import React') ||
    content.includes('export default')
  );
  
  const hasJSX = Object.keys(fileMap).some(file => 
    file.includes('.jsx') || file.includes('.tsx')
  );
  
  const hasPackageJson = fileMap['/package.json'];
  
  return hasModernJS || hasJSX || hasPackageJson;
}

// Create package.json if missing but needed
function createPackageJsonIfNeeded(fileMap) {
  if (fileMap['/package.json']) {
    return fileMap['/package.json'];
  }
  
  const hasReact = Object.values(fileMap).some(content => 
    content.includes('React') || content.includes('react')
  );
  
  const hasJSX = Object.keys(fileMap).some(file => 
    file.includes('.jsx') || file.includes('.tsx')
  );
  
  if (hasReact || hasJSX) {
    return `{
  "name": "generated-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.4.0"
  }
}`;
  }
  
  return null;
}

// Create Vite config if needed
function createViteConfigIfNeeded(fileMap) {
  if (fileMap['/vite.config.js'] || fileMap['/vite.config.ts']) {
    return null; // Already exists
  }
  
  const hasReact = Object.values(fileMap).some(content => 
    content.includes('React') || content.includes('react')
  );
  
  if (hasReact) {
    return `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false
  }
})`;
  }
  
  return null;
}

// Create index.html for Vite if needed
function createViteIndexHtmlIfNeeded(fileMap) {
  if (fileMap['/index.html']) {
    return null; // Already exists
  }
  
  const hasReact = Object.values(fileMap).some(content => 
    content.includes('React') || content.includes('react')
  );
  
  if (hasReact) {
    return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Generated App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`;
  }
  
  return null;
}

// Create main.jsx entry point if needed
function createMainJSXIfNeeded(fileMap) {
  if (fileMap['/src/main.jsx'] || fileMap['/src/main.tsx']) {
    return null; // Already exists
  }
  
  const hasReact = Object.values(fileMap).some(content => 
    content.includes('React') || content.includes('react')
  );
  
  if (hasReact) {
    return `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`;
  }
  
  return null;
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 CommandCore Runtime Backend running on http://localhost:${PORT}`);
  console.log(`📁 Temporary directory: ${TEMP_DIR}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
