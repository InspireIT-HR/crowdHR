import axios from 'axios';
import { store } from '../store/store';

const axiosInstance = axios.create({
    baseURL: `https://77.79.108.34:63748/api`,
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.params = config.params || {};
    config.headers['Authorization'] = `Basic ${token}`;
    return config;
});

export default axiosInstance;
