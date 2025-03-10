import axios from 'axios';

const getApplicationsByShelter = async (shelterId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/filter/?shelter=${shelterId}`);
  return response.data;
}

const applicationServices = {
  getApplicationsByShelter
};

export default applicationServices;