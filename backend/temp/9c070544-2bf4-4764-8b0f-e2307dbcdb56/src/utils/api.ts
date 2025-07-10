import axios from 'axios';

const API_URL = '/api';

export const fetchGames = async () => {
  const response = await axios.get(`${API_URL}/games`);
  return response.data;
};

export const getGameDetails = async (id: string) => {
  const response = await axios.get(`${API_URL}/games/${id}`);
  return response.data;
};