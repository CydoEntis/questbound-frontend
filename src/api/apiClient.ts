import axios from "axios";
import { baseUrl } from "./endpoints";
import useAuthStore from "../stores/useAuthStore";
import authService from "../features/auth/api/auth.service";
import localStorageService from "./services/localStorage.service";
import { ERROR_TYPES } from "./errors/error.constants";

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
      return Promise.reject(
        new Error("Server unreachable. Please try again later.")
      );
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
        return Promise.reject(
          new Error("Token refresh failed. Please log in again.")
        );
      }
    }

    console.log("Status Code: ", error.response.status);

    // Attach formatted validation errors
    if (error.response?.status === 400) {
      return Promise.reject({
        type: ERROR_TYPES.VALIDATION_ERROR,
        errors: error.response.data.errors,
        statusCode: error.response.status,
      });
    }

    if (error.response?.status === 404) {
      console.log("Not found errors: ", error.response.data.errors);

      const errorMessage =
        Object.values(error.response.data.errors)?.[0] || "Resource not found.";

      return Promise.reject({
        type: ERROR_TYPES.NOT_FOUND_ERROR,
        error: errorMessage,
        statusCode: error.response.status,
      });
    }

    if (error.response?.status === 409) {
      console.log("Conflict errors: ", error.response.data.errors);

      const errorMessage =
        Object.values(error.response.data.errors)?.[0] || "Resource conflict.";

      return Promise.reject({
        type: ERROR_TYPES.CONFLICT_ERROR,
        error: errorMessage,
        statusCode: error.response.status,
      });
    }

    const errorMessage =
      Object.values(error.response.data.errors)?.[0] ||
      "An unknown error occurred.";

    // Log relevant error details
    return Promise.reject({
      type: ERROR_TYPES.UNEXPECTED_ERROR,
      error: errorMessage,
      statusCode: error.response?.status,
    });
  }
);

// function formatValidationErrors(
//   errors: Record<string, string[]>
// ): Record<string, string> {
//   return Object.entries(errors).reduce(
//     (acc, [field, messages]) => {
//       acc[field] = messages[0]; // Use the first error message for each field
//       return acc;
//     },
//     {} as Record<string, string>
//   );
// }

export default apiClient;
