export const setAuthHeader = (token) => {
  localStorage.setItem('token', token);
};

export const removeAuthHeader = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};