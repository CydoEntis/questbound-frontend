import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "./services/auth.services";
import useAuthStore from "../../../stores/useAuthStore";
import { LoginResponse, LoginCredentials } from "../shared/types";


export function useLogin() {
	const { setUser, setTokens } = useAuthStore();
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (
			credentials: LoginCredentials,
		): Promise<LoginResponse> => {
			return await authServices.loginUser(credentials);
		},
		onSuccess: (data) => {
			console.log(data);
			setUser(data.user);
			setTokens(data.tokens);
		},
		onError: (error: Error) => {
			console.error("Login Failed", error);
		},
	});
}
