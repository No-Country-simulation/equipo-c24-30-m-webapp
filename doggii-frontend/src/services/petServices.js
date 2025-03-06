import axios from 'axios';

const createPet = async (pet) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/pet`, pet);
  return response.data;
};

const petServices = {
  createPet
};

export default petServices;