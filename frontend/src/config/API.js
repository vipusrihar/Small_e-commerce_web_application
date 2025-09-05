import axios from "axios";


// Default timeout (5 seconds)
const DEFAULT_TIMEOUT = 5000;

// Create secured Axios instance (with cookies)
export const securedApi = axios.create({
  baseURL: '/api',
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// Optional: API for public endpoints (no auth required)
export const publicApi = axios.create({
  baseURL: '/api',
  timeout: DEFAULT_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
