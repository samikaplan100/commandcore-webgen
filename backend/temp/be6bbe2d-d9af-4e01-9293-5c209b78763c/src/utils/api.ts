import axios from 'axios';

const API_URL = '/api/games';

export const fetchGames = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const fetchGameById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};