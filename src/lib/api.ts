import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
});

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;