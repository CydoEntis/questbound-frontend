import { create } from "zustand";

const useAuthStore = create((set) => ({
	user: null, // Current user information
	token: null, // JWT or session token
	setUser: (user) => set({ user }),
	setToken: (token) => set({ token }),
	logout: () => set({ user: null, token: null }), // Logout clears the state
}));

export default useAuthStore;
