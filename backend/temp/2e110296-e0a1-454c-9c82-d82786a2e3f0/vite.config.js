import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    plugins: [react()],
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_API_URL)
    },
    server: {
      port: 3000
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: 'public/index.html'
      }
    }
  };
});