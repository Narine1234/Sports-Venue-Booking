import axios from 'axios';

const API_URL = 'http://localhost:8080/api/bookings';

const createBooking = (booking) => {
  return axios.post(API_URL, booking);
};

export default createBooking;
