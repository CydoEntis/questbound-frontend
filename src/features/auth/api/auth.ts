import { useMutation } from "@tanstack/react-query";
import authService from "./auth.service";
import useAuthStore from "../../../stores/useAuthStore";
import {
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  AuthSuccessResponse,
} from "../shared/auth.types";
import localStorageService from "../../../api/services/localStorage.service";
import { notifications } from "@mantine/notifications";

export function useLogin() {
  const { loginUser } = useAuthStore();

  return useMutation({
    mutationFn: async (
      credentials: LoginRequest
    ): Promise<AuthSuccessResponse> => {
      return await authService.loginUser(credentials);
    },
    onSuccess: () => {
      loginUser();

      const questbound = { isAuthenticated: true };

      localStorageService.setItem("questbound", questbound);

      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login Failed",
        message: "Something went wrong!",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export function useRegister() {
  const { loginUser } = useAuthStore();

  return useMutation({
    mutationFn: async (
      credentials: RegisterRequest
    ): Promise<AuthSuccessResponse> => {
      return await authService.registerUser(credentials);
    },
    onSuccess: () => {
      loginUser();

      const questbound = { isAuthenticated: true };

      localStorageService.setItem("questbound", questbound);

      notifications.show({
        title: "Success",
        message: "Login successful!",
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login Failed",
        message: "Something went wrong!",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export function useRefreshTokens() {
  return useMutation({
    mutationFn: async (): Promise<AuthSuccessResponse> => {
      return await authService.refreshTokens();
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Login Expired",
        message: "You are no longer logged in.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export function useLogout() {
  const { logoutUser } = useAuthStore();

  const deleteQBCookies = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

      // Check if the cookie name starts with "QB-"
      if (name.startsWith("QB-")) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
      }
    });
  };

  return useMutation({
    mutationFn: async (): Promise<AuthSuccessResponse> => {
      return await authService.logoutUser();
    },
    onSuccess: (data) => {
      logoutUser();
      localStorageService.removeItem("questbound");

      // Delete cookies starting with "QB-"
      deleteQBCookies();

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Logout Failed",
        message: "Something went wrong!",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (
      email: ForgotPasswordRequest
    ): Promise<AuthSuccessResponse> => {
      return await authService.forgotPassword(email);
    },
    onSuccess: (data) => {
      console.log(data);

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Success",
        message: "Email has been sent.",
        color: "green",
        position: "top-right",
      });
      throw error;
    },
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: async (
      request: ResetPasswordRequest
    ): Promise<AuthSuccessResponse> => {
      return await authService.resetPassword(request);
    },
    onSuccess: (data) => {
      console.log(data);

      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Error",
        message: "Unable to reset password.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (
      request: ChangePasswordRequest
    ): Promise<AuthSuccessResponse> => {
      return await authService.changePassword(request);
    },
    onSuccess: (data) => {
      notifications.show({
        title: "Success",
        message: data.message,
        color: "green",
        position: "top-right",
      });
    },
    onError: (error: Error) => {
      notifications.show({
        title: "Error",
        message: "Updating password failed.",
        color: "red",
        position: "top-right",
      });
      throw error;
    },
  });
}
