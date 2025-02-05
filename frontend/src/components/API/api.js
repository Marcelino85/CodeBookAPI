import axios from 'axios';
import dotenv from 'dotenv'

dotenv.config()

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3006', // Use a URL do backend na Render
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
