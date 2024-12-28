import axios from "axios";
import { baseUrl } from "./endpoints";
import useAuthStore from "../stores/useAuthStore";
import authService from "../features/auth/api/auth.service";
import localStorageService from "./services/localStorage.service";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});


apiClient.interceptors.request.use(
  (request) => {
    // Add any request logic here (e.g., CSRF tokens)
    return request;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle server down or unreachable
    if (!error.response) {
      console.error("Server unreachable. Logging out.");
      useAuthStore.getState().logoutUser();
      localStorageService.removeItem("questbound");
      window.location.href = "/login";
      return Promise.reject(error);
    }

    // Handle 401 Unauthorized and token refresh
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await authService.refreshTokens();
        return apiClient(originalRequest); // Retry the original request
      } catch {
        console.error("Token refresh failed. Logging out.");
        useAuthStore.getState().logoutUser();
        localStorageService.removeItem("questbound");
        window.location.href = "/login";
      }
    }

    // Attach formatted validation errors
    if (error.response?.status === 400) {
      const validationErrors = formatValidationErrors(
        error.response.data.errors
      );
      return Promise.reject(validationErrors);
    }

    return Promise.reject(error);
  }
);

function formatValidationErrors(
  errors: Record<string, string[]>
): Record<string, string> {
  return Object.entries(errors).reduce(
    (acc, [field, messages]) => {
      acc[field] = messages[0]; // Use the first error message for each field
      return acc;
    },
    {} as Record<string, string>
  );
}

export default apiClient;
