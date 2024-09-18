import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getUserSessions = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/sessions/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user sessions', error);
    throw error;
  }
};

export const createSession = async (sessionData) => {
  try {
    const response = await axios.post(`${API_URL}/sessions`, sessionData);
    return response.data;
  } catch (error) {
    console.error('Error creating session', error);
    throw error;
  }
};
