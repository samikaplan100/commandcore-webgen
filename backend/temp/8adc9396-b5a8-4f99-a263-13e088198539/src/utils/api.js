import axios from 'axios';

const api = axios.create({
  baseURL: process.env.VITE_API_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
});

export const getGames = () => api.get('/games');
export const getGame = (id) => api.get(`/games/${id}`);
export const createGame = (data) => api.post('/games', data);
export const login = (credentials) => api.post('/auth/login', credentials);