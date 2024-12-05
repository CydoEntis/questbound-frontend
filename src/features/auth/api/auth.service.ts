import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";
import {
  RegisterRequest,
  LoginResponse,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  Tokens,
} from "../shared/auth.types";

const registerUser = async (
  credentials: RegisterRequest
): Promise<LoginResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/register`, credentials)
  ).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const loginUser = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/login`, credentials)
  ).data;

  if (!response.isSuccess) throw new Error();

  return response.result;
};

const logoutUser = async (tokens: Tokens): Promise<boolean> => {
  const response = (await apiClient.post(`${endpoints.auth}/logout`, tokens))
    .data;
  if (!response.isSuccess) throw new Error();

  return response.isSuccess;
};

const refreshTokens = async (tokens: Tokens): Promise<Tokens> => {
  const response = (await apiClient.post(`${endpoints.auth}/refresh`, tokens))
    .data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const forgotPassword = async (email: ForgotPasswordRequest): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/forgot-password`, email)
  ).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

const resetPassword = async (request: ResetPasswordRequest): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/reset-password`, request)
  ).data;
  if (!response.isSuccess) throw new Error();
  return response.result;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokens,
  forgotPassword,
  resetPassword,
};
