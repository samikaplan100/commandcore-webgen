import axios from 'axios';

const API_URL = '/api/commands';

export const sendCommand = async (command: string): Promise<string> => {
  try {
    const response = await axios.post(API_URL, { command });
    return response.data.response;
  } catch (error) {
    console.error('API Error:', error);
    return 'Error communicating with JARVIS core';
  }
};