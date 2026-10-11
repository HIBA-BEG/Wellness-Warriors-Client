import api from './api';
import { apiErrorMessage } from '../utils/apiError';

const addAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      if (!response.data) {
        throw new Error('No response data received');
      }
      return response.data;
    } catch (error) {
      throw new Error(apiErrorMessage(error, 'Registration failed'));
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw new Error(apiErrorMessage(error, 'Login failed'));
    }
  },

  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return null;
      const response = await api.get('/auth/verify', addAuthHeader(token));
      return response.data;
    } catch (error) {
      if (error?.response?.status === 429) {
        const rateLimitError = new Error('Too many requests');
        rateLimitError.status = 429;
        throw rateLimitError;
      }
      return null;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw new Error(apiErrorMessage(error, 'Password reset request failed'));
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      throw new Error(apiErrorMessage(error, 'Password reset failed'));
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;
