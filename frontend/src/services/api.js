import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar respuestas
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      return Promise.reject({ 
        success: false, 
        message: 'No se pudo conectar con el servidor' 
      });
    } else {
      // Algo sucedió al configurar la petición
      return Promise.reject({ 
        success: false, 
        message: error.message 
      });
    }
  }
);

export const personasAPI = {
  getAll: () => api.get('/personas'),
  getById: (id) => api.get(`/personas/${id}`),
  create: (persona) => api.post('/personas', persona),
  update: (id, persona) => api.put(`/personas/${id}`, persona),
  delete: (id) => api.delete(`/personas/${id}`),
};

export default api;
