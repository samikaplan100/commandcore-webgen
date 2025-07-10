#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('Starting build process...');
execSync('npm run build', { stdio: 'inherit' });
execSync('npm run start:api', { stdio: 'inherit' });
console.log('Build completed successfully!');