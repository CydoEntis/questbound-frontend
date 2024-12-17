import axios from "axios";
import { baseUrl } from "./endpoints";
import useAuthStore from "../stores/useAuthStore";
import authService from "../features/auth/api/auth.service";
import localStorageService from "./services/localStorage.service";
import Cookies from 'js-cookie';


const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, 
});

apiClient.interceptors.request.use(
  (request) => {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      const csrfToken = Cookies.get("QB-CSRF-TOKEN");

      if (csrfToken) {
        request.headers["QB-CSRF-TOKEN"] = csrfToken;
      }
    }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authService.refreshTokens(); 

        console.log("Tokens refreshed successfully.");

        return apiClient(originalRequest); 
      } catch (error) {
        console.log(error);
        console.log("Token refresh failed, logging out.");
        useAuthStore.getState().logoutUser(); 
        localStorageService.removeItem("questbound");
        window.location.href = "/login"; 
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
