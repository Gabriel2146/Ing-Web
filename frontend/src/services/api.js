// src/services/api.js

import axios from 'axios';

// Configura la URL base de tu backend
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',  // Cambia esto con la URL de tu API si es diferente
  headers: {
    'Content-Type': 'application/json',
  }
});

export default api;
