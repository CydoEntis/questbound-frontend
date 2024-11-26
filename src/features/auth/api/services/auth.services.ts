import apiClient from "../../../../lib/api/apiClient";
import endpoints from "../../../../lib/api/endpoints";
import {
	AuthResponse,
	LoginCredentials,
	RegisterCredentials,
	Tokens,
} from "../../shared/types";

const registerUser = async (
	credentials: RegisterCredentials,
): Promise<AuthResponse> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/register`, credentials)
	).data;
	if (!response.isSuccess) throw new Error();
	return response.result;
};

const loginUser = async (
	credentials: LoginCredentials,
): Promise<AuthResponse> => {
	const response = (
		await apiClient.post(`${endpoints.auth}/login`, credentials)
	).data;

	if (!response.isSuccess) throw new Error();

	return response.result.data;
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

export default { registerUser, loginUser, logoutUser, refreshTokens };
