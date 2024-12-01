import { useMutation } from "@tanstack/react-query";
import authServices from "./services/auth.services";
import useAuthStore from "../../../stores/useAuthStore";
import {
	LoginResponse,
	LoginCredentials,
	Tokens,
	RegisterCredentials,
	ForgotPasswordRequest,
	ChangePasswordRequest,
	ResetPasswordRequest,
} from "../shared/types";
import localStorageService from "./services/localStorage.service";
import { notifications } from "@mantine/notifications";

export function useLogin() {
	const { setUser, setTokens } = useAuthStore();

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

export function useRegister() {
	const { setUser, setTokens } = useAuthStore();

	return useMutation({
		mutationFn: async (
			credentials: RegisterCredentials,
		): Promise<LoginResponse> => {
			return await authServices.registerUser(credentials);
		},
		onSuccess: (data) => {
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

export function useRefreshTokens() {
	const { setTokens } = useAuthStore();

	return useMutation({
		mutationFn: async (tokens: Tokens): Promise<Tokens> => {
			return await authServices.refreshTokens(tokens);
		},
		onSuccess: (data) => {
			console.log(data);
			setTokens(data);

			const collabParty = { token: data.accessToken };
			const existingData = localStorageService.getItem("collabParty") || {};
			const updatedData = { ...existingData, ...collabParty };

			localStorageService.setItem("collabParty", updatedData);

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
