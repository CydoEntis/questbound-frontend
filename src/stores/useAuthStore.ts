import { create } from "zustand";
import { AuthenticatedUser, TokensResponse, UserResponse } from "../features/auth/shared/types";

export type AuthState = {
	user: AuthenticatedUser | null;
	tokens: TokensResponse | null;
	loading: {
		session: boolean;
		refresh: boolean;
		register: boolean;
		login: boolean;
		logout: boolean;
	};
	setUser: (user: UserResponse | null) => void;
	setTokens: (tokens: TokensResponse | null) => void;
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
	setUser: (user: UserResponse | null) => {
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
	setTokens: (tokens: TokensResponse | null) => {
		set({ tokens });
	},
	checkIsAuthenticated: () => {
		const user = get().user;
		return user ? user.isAuthenticated : false; // If user is null, return false
	},
}));

export default useAuthStore;
