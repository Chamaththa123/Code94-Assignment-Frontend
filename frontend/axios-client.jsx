import axios from "axios";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: `http://localhost:3000/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the token to the Authorization header if it exists
axiosClient.interceptors.request.use((config) => {
  const token = Cookies.get("_auth");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 Unauthorized errors by clearing token and redirecting to login
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Remove token cookie and redirect to login if not already there
      Cookies.remove("_auth");
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
