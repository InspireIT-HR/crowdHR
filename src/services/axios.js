import axiosInstance from 'axios';

const axios = axiosInstance.create({
    baseURL: `https://77.79.108.34:63748/api`,
});

axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.params = config.params || {};
    config.headers['Authorization'] = `Basic ${token}`;
    return config;
});

export default axios;
