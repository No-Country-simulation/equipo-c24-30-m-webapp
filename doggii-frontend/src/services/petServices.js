import axios from 'axios';

const createPet = async (pet) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/pet`, pet);
  return response.data;
};

const getPetsByShelter = async (shelterId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pet/shelter/${shelterId}`);
  return response.data;
}

const petServices = {
  createPet,
  getPetsByShelter
};

export default petServices;