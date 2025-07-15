// utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://unstopgrowb.onrender.com',
    withCredentials: true,
});

export default axiosInstance;
