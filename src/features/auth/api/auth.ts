import { useMutation } from "@tanstack/react-query";
import authServices from "./services/auth.service";
import useAuthStore from "../../../stores/useAuthStore";
import {
  LoginResponse,
  LoginRequest,
  TokensResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ChangePasswordRequest,
  ResetPasswordRequest,
  AuthenticatedUser,
} from "../shared/types";
import localStorageService from "./services/localStorage.service";
import { notifications } from "@mantine/notifications";

export function useLogin() {
  const { loginUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<LoginResponse> => {
      return await authServices.loginUser(credentials);
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
      return await authServices.registerUser(credentials);
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
    mutationFn: async (tokens: TokensResponse): Promise<TokensResponse> => {
      return await authServices.refreshTokens(tokens);
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
    mutationFn: async (tokens: TokensResponse): Promise<void> => {
      await authServices.logoutUser(tokens);
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
      await authServices.forgotPassword(email);
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

export function useChangePassword() {
  return useMutation({
    mutationFn: async (request: ChangePasswordRequest): Promise<void> => {
      await authServices.changePassword(request);
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
      await authServices.resetPassword(request);
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
