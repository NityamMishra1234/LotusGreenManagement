import axios from 'axios';
import store from '../RTK/store'; // Adjust the path based on your project structure

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
});

axiosInstance.interceptors.request.use((config) => {
    const token = store.getState().auth.token; // Access token from the Redux store
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default axiosInstance;
