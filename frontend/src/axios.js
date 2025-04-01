import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Ruta de la API Django
  timeout: 1000,
});

export default api;
