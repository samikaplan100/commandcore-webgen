import axios from 'axios'
import { API_URL } from '../constants/config'

export const purchaseGame = async (itemId: number) => {
  try {
    const response = await axios.post(`${API_URL}/store/purchase`, { itemId })
    return response.data
  } catch (error) {
    console.error('Purchase failed:', error)
    throw error
  }
}