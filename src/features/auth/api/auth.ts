import { useMutation } from "@tanstack/react-query";
import authService from "./auth.service";
import useAuthStore from "../../../stores/useAuthStore";
import {
  LoginResponse,
  LoginRequest,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  Tokens,
} from "../shared/auth.types";
import localStorageService from "../../../api/services/localStorage.service";
import { notifications } from "@mantine/notifications";
import { AuthenticatedUser } from "../../account/shared/account.types";

export function useLogin() {
  const { loginUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      return await authService.loginUser(credentials);
    },
    onSuccess: (data) => {
      loginUser(data);

      const authenticatedUser: AuthenticatedUser = {
        ...data.user,
        isAuthenticated: true,
      };

      localStorageService.setItem("questbound", {
        user: authenticatedUser,
        tokens: data.tokens,
      });

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
    ): Promise<LoginResponse> => {
      return await authService.registerUser(credentials);
    },
    onSuccess: (data) => {
      loginUser(data);

      localStorageService.setItem("questbound", data);

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
  const { refreshTokens } = useAuthStore();

  return useMutation({
    mutationFn: async (tokens: Tokens): Promise<Tokens> => {
      return await authService.refreshTokens(tokens);
    },
    onSuccess: (data) => {
      refreshTokens(data);

      const questbound = { token: data.accessToken };
      const existingData = localStorageService.getItem("questbound") || {};
      const updatedData = { ...existingData, ...questbound };

      localStorageService.setItem("questbound", updatedData);

      return data;
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

  return useMutation({
    mutationFn: async (tokens: Tokens): Promise<void> => {
      await authService.logoutUser(tokens);
    },
    onSuccess: () => {
      logoutUser();
      localStorageService.removeItem("questbound");

      notifications.show({
        title: "Success",
        message: "Logout successful!",
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

export function useForgotPassword() {
  return useMutation({
    mutationFn: async (email: ForgotPasswordRequest): Promise<void> => {
      await authService.forgotPassword(email);
    },
    onSuccess: (data) => {
      console.log(data);

      notifications.show({
        title: "Success",
        message: "Email has been sent.",
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
    mutationFn: async (request: ResetPasswordRequest): Promise<void> => {
      await authService.resetPassword(request);
    },
    onSuccess: (data) => {
      console.log(data);

      notifications.show({
        title: "Success",
        message: "Password has been reset.",
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
