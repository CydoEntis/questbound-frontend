import { useMutation, useQueryClient } from "@tanstack/react-query";
import authServices from "./services/auth.services";
import useAuthStore from "../../../stores/useAuthStore";
import { LoginResponse, LoginCredentials, Tokens } from "../shared/types";
import localStorageService from "./services/localStorage.service";
import { notifications } from "@mantine/notifications";

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

			const collabParty = {
				user: data.user,
				tokens: data.tokens,
			};

			localStorageService.setItem("collabParty", collabParty);

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

export function useLogout() {
	const { setUser, setTokens } = useAuthStore();

	return useMutation({
		mutationFn: async (tokens: Tokens): Promise<void> => {
			await authServices.logoutUser(tokens);
		},
		onSuccess: () => {
			setUser(null);
			setTokens(null);

			localStorageService.removeItem("collabParty");

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
