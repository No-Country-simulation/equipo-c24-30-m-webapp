import axios from 'axios';

const createPet = async (pet) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/pet`, pet);
  return response.data;
};

const getPet = async (petId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pet/${petId}`);
  return response.data;
}

const getPets = async () => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pet`);
  return response.data;
}

const getPetsByShelter = async (shelterId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pet/shelter/${shelterId}`);
  return response.data;
}

const getPetsByCity = async (city) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/pet`, {
    params: {
      'address[city]': city
    }
  });
  return response.data;
}

const updatePet = async (petId, pet) => { 
  const response = await axios.put(`${import.meta.env.VITE_BACKEND_URI}/api/pet/${petId}`, pet);
  return response.data;
}

const deletePet = async (petId) => {
  const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/pet/${petId}`);
  return response.data;
}

const petServices = {
  createPet,
  getPetsByShelter,
  getPetsByCity,
  getPet,
  getPets,
  updatePet,
  deletePet
};

export default petServices;