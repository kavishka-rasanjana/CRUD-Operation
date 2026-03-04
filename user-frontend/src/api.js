import axios from 'axios';

// Creating a central axios instance
const api = axios.create({
    baseURL: "http://localhost:8080/api/v1"
});

export default api;