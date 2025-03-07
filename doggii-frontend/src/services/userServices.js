import axios from 'axios';

const updateUserProfile = async (userId, userRole, userData) => {
  const response = await axios.put(
    `${import.meta.env.VITE_BACKEND_URI}/api/${userRole}/${userId}`,
    userData
  );
  return response.data;
};

const getUser = async (userId, userRole) => {
  const response = await axios.get(
    `${import.meta.env.VITE_BACKEND_URI}/api/${userRole}/${userId}`
  );
  return response.data;
};

export const userServices = {
  updateUserProfile,
  getUser
};

export default userServices;