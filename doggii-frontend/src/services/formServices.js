import axios from "axios"

const createAdoptionForm = async (formData) => {
  const response = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/adoptionForm`, formData);
  return response.data;
}

const getAdoptionForm = async (shelterId) => {
  const response = await axios.get(`${import.meta.env.VITE_BACKEND_URI}/api/adoptionForm/getFormByShelter/${shelterId}`);
  return response.data;
}

const formServices = {
  createAdoptionForm,
  getAdoptionForm
};

export default formServices;