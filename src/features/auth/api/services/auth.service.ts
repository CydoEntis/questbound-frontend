import apiClient from "../../../../lib/api/apiClient";
import endpoints from "../../../../lib/api/endpoints";
import {
	LoginResponse,
	LoginRequest,
	RegisterRequest,
	TokensResponse,
	ForgotPasswordRequest,
	ChangePasswordRequest,
	ResetPasswordRequest,
} from "../../shared/types";

const registerUser = async (
	credentials: RegisterRequest,
): Promise<LoginResponse> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/register`, credentials)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const loginUser = async (
	credentials: LoginRequest,
): Promise<LoginResponse> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/login`, credentials)
	).data;


	if (!response.isSuccess) throw new Error();

	return response.result;
};

const logoutUser = async (tokens: TokensResponse): Promise<boolean> => {
	const response = (await apiClient.post(`${endpoints.auth}/logout`, tokens))
		.data;
	if (!response.isSuccess) throw new Error();

	return response.isSuccess;
};

const refreshTokens = async (tokens: TokensResponse): Promise<TokensResponse> => {
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

const changePassword = async (
	request: ChangePasswordRequest,
): Promise<void> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/change-password`, request)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const resetPassword = async (
	request: ResetPasswordRequest,
): Promise<void> => {
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
	changePassword,
	resetPassword
};
