import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

export const eventService = {
  createEvent: async (eventData) => {
    try {
      const formData = new FormData();

      formData.append('title', eventData.title);
      formData.append('description', eventData.description);
      formData.append('location', eventData.location);
      formData.append('startDate', JSON.stringify(eventData.startDate));
      formData.append('endDate', JSON.stringify(eventData.endDate));
      formData.append('organizer', eventData.organizer);
      formData.append('participants', JSON.stringify(eventData.participants));
      formData.append('status', eventData.status);

      if (eventData.poster instanceof File) {
        formData.append('poster', eventData.poster);
      }

      const response = await api.post('/event', formData);
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

  joinEvent: async (id) => {
    try {
      const response = await api.post(`/event/${id}/join`, null, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  leaveEvent: async (id) => {
    try {
      const response = await api.delete(`/event/${id}/join`, {
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
