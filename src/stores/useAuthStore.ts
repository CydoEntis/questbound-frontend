import { create } from "zustand";
import { AuthenticatedUser, Tokens, User } from "../features/auth/shared/types";

export type AuthState = {
	user: AuthenticatedUser | null;
	tokens: Tokens | null;
	loading: {
		session: boolean;
		refresh: boolean;
		register: boolean;
		login: boolean;
		logout: boolean;
	};
	setUser: (user: User | null) => void;
	setTokens: (tokens: Tokens | null) => void;
	checkIsAuthenticated: () => boolean;
};

const useAuthStore = create<AuthState>((set, get) => ({
	user: null,
	tokens: null,
	loading: {
		session: false,
		refresh: false,
		register: false,
		login: false,
		logout: false,
	},
	setUser: (user: User | null) => {
		if (user) {
			const authenticatedUser: AuthenticatedUser = {
				...user,
				isAuthenticated: true,
			};

			set({ user: authenticatedUser });
		} else {
			set({ user: null });
		}
	},
	setTokens: (tokens: Tokens | null) => {
		set({ tokens });
	},
	checkIsAuthenticated: () => {
		const user = get().user;
		return user ? user.isAuthenticated : false; // If user is null, return false
	},
}));

export default useAuthStore;
