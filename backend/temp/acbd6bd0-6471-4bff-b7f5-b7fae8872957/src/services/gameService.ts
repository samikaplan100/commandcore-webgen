import axios from 'axios'
import { API_URL } from '../constants/config'

export const fetchGames = async () => {
  try {
    const response = await axios.get(`${API_URL}/games`)
    return response.data
  } catch (error) {
    console.error('Error fetching games:', error)
    return []
  }
}