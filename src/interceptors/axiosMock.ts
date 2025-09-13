import axios from 'axios';

const apiMock = axios.create({
  baseURL: import.meta.env.VITE_API_URL3,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor para agregar el token a cada solicitud
apiMock.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = user?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔐 Token enviado con apiMock:', token);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiMock;
