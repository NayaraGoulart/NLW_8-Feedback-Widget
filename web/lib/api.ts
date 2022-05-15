import axios from 'axios';

console.log('environment', import.meta.env);

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});