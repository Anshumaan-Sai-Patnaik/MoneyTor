import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

export const extractMessage = (err) =>
  err?.response?.data?.error || err?.message || "Something went wrong";

export default api;
