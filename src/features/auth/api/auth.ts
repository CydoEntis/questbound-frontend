import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "./services/auth.services";
import useAuthStore from "../../../stores/useAuthStore";
import { AuthResponse, LoginCredentials } from "../shared/types";

const { setUser, setTokens } = useAuthStore();

export function useLogin() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			credentials: LoginCredentials,
		): Promise<AuthResponse> => {
			return await authServices.loginUser(credentials);
		},
		onSuccess: (data) => {
			setUser(data.user);
			setTokens(data.tokens);
		},
		onError: (error: Error) => {
			console.error("Login Failed", error);
		},
	});
}
