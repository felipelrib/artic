import axios from "axios";

const api = axios.create({
  baseURL: process.env.STRAPI_API_URL
});

export default api;
