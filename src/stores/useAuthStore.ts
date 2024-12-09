import { create } from "zustand";
import { User } from "../features/account/shared/account.types";

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  loginUser: () => void;
  logoutUser: () => void;
  checkIsAuthenticated: () => boolean;
};

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,

  loginUser: () => {
    set({ isAuthenticated: true });
  },
  logoutUser: () => {
    set({ isAuthenticated: false });
  },
  checkIsAuthenticated: () => {
    const authenticated = get().isAuthenticated;
    if (authenticated) return true;
    return false;
  },
}));

export default useAuthStore;
