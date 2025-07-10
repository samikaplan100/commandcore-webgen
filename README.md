# CommandCore 🚀

A **real runtime** AI-powered code generation platform inspired by v0.dev, built with React, Node.js, and OpenRouter's Qwen model.

## ✨ **Real Runtime Features**

- **🔄 Live Development Servers**: Actually runs `npm install` and `npm run dev` in isolated environments
- **🌐 Real Preview URLs**: Shows your app running on actual localhost ports (e.g., http://localhost:3000)
- **📁 File System Operations**: Creates real files in temporary directories, not just in memory
- **⚡ Process Management**: Manages background development servers with automatic cleanup
- **🛡️ Session Isolation**: Each generation gets its own isolated environment with unique session IDs
- **🔧 Multi-Framework Support**: React, Vue, Node.js, and static HTML/CSS/JS projects

## Features

- **AI Code Generation**: Generate complete, working code solutions from natural language prompts
- **Real Runtime Environment**: Files are actually created, dependencies installed, and servers started
- **Live Preview**: See your app running in real-time with actual development servers
- **Modern UI**: Dark theme with GitHub-inspired design
- **Syntax Highlighting**: Monaco Editor integration for professional code editing
- **File Management**: Real file system with automatic cleanup
- **Terminal Output**: Real-time build and server logs
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

### Frontend
- **React 19** - Modern React with latest features
- **Vite** - Fast build tool and dev server
- **Monaco Editor** - Professional code editor with syntax highlighting
- **Axios** - HTTP client for API communication

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **OpenRouter API** - AI model integration (Qwen 3-32B)
- **fs-extra** - Enhanced file system operations
- **child_process** - Process management for npm and dev servers
- **UUID** - Session management
- **CORS** - Cross-origin resource sharing

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd commandcore
   ```

2. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd backend
   npm start
   ```
   The backend will run on `http://localhost:3001`

5. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`

### Environment Variables

Create a `.env` file in the backend directory:

```env
OPENROUTER_API_KEY=your_openrouter_api_key_here
PORT=3001
```

## Usage

1. **Open the application** in your browser at `http://localhost:5173`

2. **Enter a prompt** describing what you want to build, for example:
   - "Create a React todo app with dark mode"
   - "Build a calculator with basic operations"
   - "Make a weather widget that shows current conditions"
   - "Create a Node.js Express API with user authentication"

3. **Watch the magic happen**:
   - AI generates complete project files
   - Files are saved to real temporary directories
   - Dependencies are installed with `npm install`
   - Development server starts automatically
   - Live preview shows your app running on a real port

4. **Browse generated files** in the file tree on the left

5. **View code** in the Monaco Editor with syntax highlighting

6. **See real-time preview** of your running application

## How It Works

### 1. **AI Code Generation**
- Sends your prompt to OpenRouter's Qwen model
- Parses response into individual files with proper structure
- Generates complete projects with all necessary files

### 2. **Real File System Operations**
- Creates unique session directories (e.g., `/temp/session-uuid/`)
- Saves all generated files to disk
- Maintains proper directory structure

### 3. **Dependency Management**
- Detects `package.json` files automatically
- Runs real `npm install` in session directories
- Handles dependency conflicts and errors

### 4. **Development Server Management**
- Starts real development servers (`npm run dev`, `vite`, etc.)
- Assigns unique ports (3000-4000 range)
- Manages server processes with automatic cleanup

### 5. **Live Preview**
- Proxies real development servers to iframe
- Shows actual running applications
- Handles both server and static file previews

## API Endpoints

### POST `/generate`
Generate code and start development server

**Request:**
```json
{
  "prompt": "Create a React todo app"
}
```

**Response:**
```json
{
  "sessionId": "uuid-session-id",
  "files": ["/package.json", "/src/App.jsx", "/src/index.css"],
  "contents": {
    "/package.json": "{...}",
    "/src/App.jsx": "import React...",
    "/src/index.css": "body { margin: 0; }"
  },
  "installResult": "Dependencies installed successfully",
  "serverResult": "Development server started",
  "previewUrl": "http://localhost:3000",
  "port": 3000
}
```

### GET `/session/:sessionId`
Get session status and information

### DELETE `/session/:sessionId`
Kill session and cleanup resources

### GET `/sessions`
List all active sessions

### GET `/health`
Health check endpoint

## Session Management

- **Automatic Cleanup**: Sessions are automatically cleaned up after 30 minutes
- **Process Management**: Background servers are properly terminated
- **Resource Isolation**: Each session runs in its own directory
- **Port Management**: Automatic port assignment and conflict resolution

## Project Structure

```
commandcore/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── FileTree.jsx      # File navigation
│   │   │   ├── CodeEditor.jsx    # Monaco editor integration
│   │   │   ├── PromptBox.jsx     # AI prompt input
│   │   │   └── LivePreview.jsx   # Real runtime preview
│   │   ├── App.jsx               # Main application
│   │   └── index.css             # Global styles
│   └── package.json
├── backend/
│   ├── index.js                  # Express server with runtime engine
│   ├── temp/                     # Temporary session directories
│   └── package.json
└── README.md
```

## Supported Project Types

### React Applications
- Full React projects with Vite or Create React App
- JSX/TSX components with modern React patterns
- Hot reloading development servers

### Vue Applications
- Vue 3 projects with Vue CLI or Vite
- Single File Components (SFC)
- Vue Router and Vuex support

### Node.js Applications
- Express.js APIs and servers
- RESTful endpoints and middleware
- Database integrations

### Static Websites
- HTML/CSS/JavaScript projects
- No build process required
- Direct file preview

## Customization

### Adding New File Types
To support additional file types, update the `getLanguage` function in `CodeEditor.jsx`:

```javascript
case 'py': return 'python';
case 'java': return 'java';
// Add more cases as needed
```

### Changing AI Model
To use a different AI model, update the model parameter in `backend/index.js`:

```javascript
model: 'qwen/qwen3-32b', // Change to your preferred model
```

### Port Configuration
Modify the port range in `backend/index.js`:

```javascript
const PORT_RANGE = { start: 3000, end: 4000 };
```

## Security Features

- **Session Isolation**: Each generation runs in isolated directories
- **Process Sandboxing**: Development servers run with limited permissions
- **Automatic Cleanup**: Temporary files and processes are automatically removed
- **Input Validation**: All prompts are validated before processing
- **Error Handling**: Comprehensive error handling and logging

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by [v0.dev](https://v0.dev)
- Built with [Monaco Editor](https://microsoft.github.io/monaco-editor/)
- AI powered by [OpenRouter](https://openrouter.ai/)
- Real runtime environment inspired by [CodeSandbox](https://codesandbox.io/) and [StackBlitz](https://stackblitz.com/)

## Support

If you encounter any issues or have questions, please open an issue on GitHub. 