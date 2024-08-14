import axios from 'axios';

const API_URL = 'http://localhost:8081/api/turfs';

export const getTurfs = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getTurfById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createTurf = async (turf) => {
  const response = await axios.post(API_URL, turf);
  return response.data;
};

export const updateTurf = async (id, turf) => {
  const response = await axios.put(`${API_URL}/${id}`, turf);
  return response.data;
};

export const deleteTurf = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
    