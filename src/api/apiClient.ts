// import axios from "axios";
// import { baseUrl } from "./endpoints";
// import useAuthStore from "../stores/useAuthStore";
// import authService from "../features/auth/api/auth.service";
// import localStorageService from "./services/localStorage.service";

// // const apiClient = axios.create({
// //   baseURL: baseUrl,
// // });

// const apiClient = axios.create({
//   baseURL: baseUrl,
//   withCredentials: true, // Include cookies in requests
// });

// apiClient.interceptors.request.use(
//   (request) => {
//     const { tokens } = useAuthStore.getState();
//     if (tokens) {
//       request.headers["Authorization"] = `Bearer ${tokens.accessToken}`;
//     }
//     return request;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// apiClient.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       const { user, tokens, refreshTokens, logoutUser } =
//         useAuthStore.getState();
//       try {
//         if (user && tokens && tokens.refreshToken) {
//           const newTokens = await authService.refreshTokens(tokens);
//           refreshTokens(newTokens);

//           localStorageService.updateItem("questbound", newTokens);

//           originalRequest.headers["Authorization"] =
//             `Bearer ${newTokens.accessToken}`;

//           return apiClient(originalRequest);
//         }
//       } catch (refreshError) {
//         console.log("Token refresh failed, logging out.");
//         authService.logoutUser(tokens!);
//         logoutUser();
//         localStorageService.clearStorage();
//         window.location.href = "/login";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default apiClient;


import axios from "axios";
import { baseUrl } from "./endpoints";
import useAuthStore from "../stores/useAuthStore";
import authService from "../features/auth/api/auth.service";
import localStorageService from "./services/localStorage.service";

const apiClient = axios.create({
  baseURL: baseUrl,
  withCredentials: true, // Include cookies in requests
});

apiClient.interceptors.request.use(
  (request) => {
    // No need to manually add the Authorization header for cookies.
    // Axios will automatically send cookies for same-origin requests.
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
        // Refresh tokens using the cookie-based mechanism
        await authService.refreshTokens(); // No need to pass tokens, since it's cookie-based
        return apiClient(originalRequest); // Retry the original request after refresh
      } catch (refreshError) {
        console.log("Token refresh failed, logging out.");
        useAuthStore.getState().logoutUser(); // Log out the user on failure
        localStorageService.removeItem("questbound");
        window.location.href = "/login"; // Redirect to login page
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
