import axios from 'axios';

const axiosRoksiri = axios.create({
    baseURL: 'http://ap.riksiri.com/api/',
    headers: {
        'Content-Type': 'application/json',     
  },
});
axiosRoksiri.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosRoksiri;