import axios from 'axios';

const api = axios.create({
  baseURL: 'http://189.3.6.50:3331/',
});

export default api;
