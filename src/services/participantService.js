import api from './api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return {};
  }
  return { Authorization: `Bearer ${token}` };
};

const participantService = {
  getAllParticipants: async () => {
    try {
      const response = await api.get('/user', {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch participants' };
    }
  },

  getParticipant: async (id) => {
    try {
      const response = await api.get(`/user/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to fetch participant' };
    }
  },

  updateParticipant: async (id, participantData) => {
    try {
      const response = await api.patch(`/user/${id}`, participantData, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update participant' };
    }
  },

  deleteParticipant: async (id) => {
    try {
      const response = await api.delete(`/user/${id}`, {
        headers: getAuthHeader(),
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete participant' };
    }
  },
};

export default participantService;
