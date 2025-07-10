import axios from 'axios';
import { API_URL } from '../constants/config.js';

export async function fetchData(status) {
  const response = await axios.get(`${API_URL}/items`, {
    params: { status },
  });
  return response.data;
}