import axios from 'axios';

export const fetchGames = async () => {
  const response = await axios.get('/api/games');
  return response.data;
};

export const createGame = async (gameData) => {
  const response = await axios.post('/api/games', gameData);
  return response.data;
};

export const getLeaderboard = async () => {
  const response = await axios.get('/api/leaderboard');
  return response.data;
};