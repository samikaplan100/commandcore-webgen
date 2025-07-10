#!/usr/bin/env node
const { execSync } = require('child_process');

console.log('Deploying to production...');
execSync('git push origin main', { stdio: 'inherit' });
execSync('ssh deploy@server "cd penguin-gamers && npm run deploy"', { stdio: 'inherit' });
console.log('Deployment completed successfully!');