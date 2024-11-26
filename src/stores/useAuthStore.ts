import { create } from "zustand";
import { AuthenticatedUser, Tokens, User } from "../features/auth/shared/types";

type AuthState = {
	user: AuthenticatedUser | null;
	tokens: Tokens | null;
	loading: {
		session: boolean;
		refresh: boolean;
		register: boolean;
		login: boolean;
		logout: boolean;
	};
	setUser: (user: User) => void;
	setTokens: (tokens: Tokens) => void;
};

const useAuthStore = create<AuthState>((set) => ({
	user: null,
	tokens: null,
	loading: {
		session: false,
		refresh: false,
		register: false,
		login: false,
		logout: false,
	},
	setUser: (user: User) => {
		const authenticatedUser: AuthenticatedUser = {
			...user,
			isLoggedIn: true,
		};

		set({ user: authenticatedUser });
	},
	setTokens: (tokens: Tokens) => {
		set({ tokens });
	},
}));

export default useAuthStore;
