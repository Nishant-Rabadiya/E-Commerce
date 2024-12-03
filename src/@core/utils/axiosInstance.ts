import axios from 'axios';

export const axiosIntance = axios?.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
