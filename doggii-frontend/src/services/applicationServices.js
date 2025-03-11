import axios from 'axios';

const getApplicationsByShelter = async (shelterId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/filter/?shelter=${shelterId}`);
  return response.data;
}

const createApplication = async (applicationData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/adoptionRequest/`, applicationData);
  return response.data;
}

const applicationServices = {
  getApplicationsByShelter,
  createApplication
};

export default applicationServices;