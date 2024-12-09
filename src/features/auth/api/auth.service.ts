import apiClient from "../../../api/apiClient";
import endpoints from "../../../api/endpoints";
import {
  RegisterRequest,
  LoginResponse,
  LoginRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  Tokens,
  ChangePasswordRequest,
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

const loginUser = async (credentials: LoginRequest): Promise<boolean> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/login`, credentials)
  ).data;

  if (!response.isSuccess) throw new Error("Login unsuccessful!");

  return true;
};

const logoutUser = async (): Promise<void> => {
  const response = (await apiClient.post(`${endpoints.auth}/logout`)).data;
  if (!response.isSuccess) throw new Error();
};

// const refreshTokens = async (tokens: Tokens): Promise<Tokens> => {
//   const response = (await apiClient.post(`${endpoints.auth}/refresh`, tokens))
//     .data;
//   if (!response.isSuccess) throw new Error();
//   return response.result;
// };

const refreshTokens = async (): Promise<void> => {
  const response = (await apiClient.post(`${endpoints.auth}/refresh`)).data;
  if (!response.isSuccess) throw new Error();
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

const changePassword = async (
  request: ChangePasswordRequest
): Promise<void> => {
  const response = (
    await apiClient.post(`${endpoints.auth}/change-password`, request)
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
  changePassword,
};
