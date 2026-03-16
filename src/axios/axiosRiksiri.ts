import axios from 'axios';
import router from '@/router/index';

const axiosRiksiri = axios.create({
    baseURL: 'https://api.riksiri.com/api/',
    headers: {
        'Content-Type': 'application/json',     
    },
});

// Interceptor de REQUEST — agrega el token
axiosRiksiri.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor de RESPONSE — maneja errores
axiosRiksiri.interceptors.response.use(
    response => response, // si va bien, devuelve normal
    error => {
        if (error.response?.status === 401) {
            // Token vencido o inválido → limpia y manda al login
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
            localStorage.removeItem('menu');
            localStorage.removeItem('home');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosRiksiri;