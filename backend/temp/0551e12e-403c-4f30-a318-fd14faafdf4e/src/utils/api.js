import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const fetchFeaturedProducts = () => {
  return axios.get(`${API_URL}/api/products/featured`).then(res => res.data);
};

export const fetchProductById = (id) => {
  return axios.get(`${API_URL}/api/products/${id}`).then(res => res.data);
};

export const addToCart = (productId, quantity) => {
  return axios.post(`${API_URL}/api/cart`, { productId, quantity }).then(res => res.data);
};