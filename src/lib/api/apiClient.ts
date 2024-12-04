import axios from "axios";
import { baseUrl } from "./endpoints";
import useAuthStore from "../../stores/useAuthStore";
import authServices from "../../features/auth/api/services/auth.service";
import LocalStorageService from "../../features/auth/api/services/localStorage.service";

const apiClient = axios.create({
  baseURL: baseUrl,
});

apiClient.interceptors.request.use(
  (request) => {
    const { user, tokens } = useAuthStore.getState();
    if (user && tokens) {
      request.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
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
      const { user, tokens, refreshTokens, logoutUser } =
        useAuthStore.getState();
      try {
        if (user && tokens && tokens.refreshToken) {
          const newTokens = await authServices.refreshTokens(tokens);
          refreshTokens(newTokens);

          LocalStorageService.updateItem("questbound", newTokens);

          originalRequest.headers["Authorization"] =
            `Bearer ${newTokens.accessToken}`;

          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        console.log("Token refresh failed, logging out.");
        authServices.logoutUser(tokens!);
        logoutUser();
        LocalStorageService.clearStorage();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
