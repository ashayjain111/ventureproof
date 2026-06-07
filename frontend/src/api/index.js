import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://ventureproof-one.vercel.app';

const api = axios.create({ baseURL: BASE_URL });

export const validateIdea = (idea) => api.post('/api/validate', { idea });
export const getHistory = () => api.get('/api/history');
export const getValidation = (id) => api.get(`/api/validation/${id}`);
