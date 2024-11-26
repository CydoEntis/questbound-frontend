import { useMutation } from "@tanstack/react-query";
import { LoginCredentials } from "../../types/auth/auth.types";
import authService from "../../features/auth/api/services/auth.services"; // Your loginUser function
import useAuthStore from "../../stores/useAuthStore"; // Store to manage authentication state
import { User } from "../../types/auth/user.types";

const useLogin = () => {
	const { setUser } = useAuthStore();

const useLogin = () => {
	const { setUser } = useAuthStore();

	// Correct usage of useMutation with proper types and function signature
	const mutation = useMutation<User, Error, LoginCredentials>(
		(credentials: LoginCredentials) => authService.loginUser(credentials), // First argument: mutation function
		{
			onSuccess: (data: User) => {
				// Explicitly typing 'data' as 'User'
				setUser(data); // Store user in Zustand
			},
			onError: (error: Error) => {
				// Explicitly typing 'error' as 'Error'
				console.error("Login failed:", error);
			},
		},
	);

	return mutation;
};

	return mutation;
};

export default useLogin;
