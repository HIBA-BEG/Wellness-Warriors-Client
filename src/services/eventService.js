import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.log('No token found in localStorage');
    return {};
  }
  //   console.log('Token found:', token);
  return { Authorization: `Bearer ${token}` };
};

export const eventService = {
  createEvent: async (eventData) => {
    try {
      const response = await api.post('/event', eventData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getAllEvents: async () => {
    try {
      const response = await api.get('/event', {
        headers: getAuthHeader(),
      });
      console.log('getAllEvents', response.data);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  updateEvent: async (id, eventData) => {
    try {
      const response = await api.patch(`/event/${id}`, eventData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  deleteEvent: async (id) => {
    try {
      const response = await api.delete(`/event/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

};
