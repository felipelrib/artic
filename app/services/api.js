import axios from "axios";
import dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const api = axios.create({
  baseURL: process.env.STRAPI_API_URL
});

export default api;
