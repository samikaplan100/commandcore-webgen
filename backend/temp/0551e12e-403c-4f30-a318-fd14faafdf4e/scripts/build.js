import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

const buildFrontend = () => {
  return new Promise((resolve, reject) => {
    exec('npm run build', (err, stdout) => {
      if (err) return reject(err);
      console.log('Frontend build completed');
      resolve(stdout);
    });
  });
};

const buildBackend = () => {
  return new Promise((resolve, reject) => {
    exec('npm run build:backend', (err, stdout) => {
      if (err) return reject(err);
      console.log('Backend build completed');
      resolve(stdout);
    });
  });
};

Promise.all([buildFrontend(), buildBackend()])
  .then(() => console.log('Build completed successfully'))
  .catch(err => {
    console.error('Build failed:', err);
    process.exit(1);
  });