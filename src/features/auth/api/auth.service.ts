import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";
import {
  RegisterRequest,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  AuthSuccessResponse,
  AuthenticatedResponse,
} from "../shared/auth.types";

const registerUser = async (
  credentials: RegisterRequest
): Promise<AuthenticatedResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/register`, credentials)
  ).data;
  if (!response.success) throw new Error();
  return response.data;
};

const loginUser = async (
  credentials: LoginRequest
): Promise<AuthenticatedResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/login`, credentials)
  ).data;

  if (!response.success) throw new Error("Login unsuccessful!");

  return response.data;
};

const logoutUser = async (): Promise<AuthSuccessResponse> => {
  const response = (await apiClient.post(`${endpoints.auth}/logout`)).data;
  if (!response.success) throw new Error();
  return response.data;
};

const refreshTokens = async (): Promise<AuthSuccessResponse> => {
  const response = (await apiClient.post(`${endpoints.auth}/refresh`)).data;

  ("ARE TOKENS REFRESHING? ", response);

  if (!response.success) throw new Error();
  return response.data;
};

const forgotPassword = async (
  email: ForgotPasswordRequest
): Promise<AuthSuccessResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/forgot-password`, email)
  ).data;
  if (!response.success) throw new Error();
  return response.data;
};

const resetPassword = async (
  request: ResetPasswordRequest
): Promise<AuthSuccessResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/reset-password`, request)
  ).data;
  if (!response.success) throw new Error();
  return response.data;
};

const changePassword = async (
  request: ChangePasswordRequest
): Promise<AuthSuccessResponse> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/change-password`, request)
  ).data;
  if (!response.success) throw new Error();
  return response.data;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  refreshTokens,
  forgotPassword,
  resetPassword,
  changePassword,
};
