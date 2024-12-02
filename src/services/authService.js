import api from './api';

const addAuthHeader = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Registration failed' };
    }
  },

  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Login failed' };
    }
  },

  verifyToken: async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get('/auth/verify', addAuthHeader(token));
      return response.data;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset request failed' };
    }
  },

  resetPassword: async (token, password) => {
    try {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Password reset failed' };
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export default authService;
