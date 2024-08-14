import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reviews';

export const getReviews = async () => {
  return await axios.get(API_URL);
};

export const createReview = async (review) => {
  return await axios.post(API_URL, review);
};

export const deleteReview = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
