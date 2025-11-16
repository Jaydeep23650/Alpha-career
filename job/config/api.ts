export const API_BASE_URL = 'https://alpha-career-bakcend.onrender.com/api';
// export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:5000';

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};
