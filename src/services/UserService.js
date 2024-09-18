import axios from 'axios';

const API_URL = 'http://localhost:5000';

/* Fetch user profile with a specific userId */
export const getUserProfile = async (userId = null) => {
  try {
    const endpoint = userId ? `${API_URL}/users/${userId}` : `${API_URL}/user-profile`;
    const response = await axios.get(endpoint); /* Dynamic endpoint based on userId presence*/
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile', error);
    throw error;
  }
};

const UserService = {
  getUserProfile,
};

export default UserService;
