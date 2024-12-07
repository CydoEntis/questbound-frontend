import { create } from "zustand";
import {
  LoginResponse,
  Tokens,
} from "../features/auth/shared/auth.types";
import { AuthenticatedUser, UpdateUserResponse } from "../features/account/shared/account.types";
import { UserAvatar } from "../features/avatar/shared/avatar.types";

export type AuthState = {
  user: AuthenticatedUser | null;
  tokens: Tokens | null;
  loginUser: (response: LoginResponse) => void;
  logoutUser: () => void;
  refreshTokens: (tokens: Tokens) => void;
  updateUserDetails: (response: UpdateUserResponse) => void;
  updateUserAvatar: (avatar: UserAvatar) => void;
  checkIsAuthenticated: () => boolean;
};

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  tokens: null,
  loginUser: (response: LoginResponse) => {
    if (response.user && response.tokens) {
      const authenticatedUser: AuthenticatedUser = {
        ...response.user,
        isAuthenticated: true,
      };

      set({ user: authenticatedUser, tokens: response.tokens });
    }
  },
  logoutUser: () => {
    set({ user: null, tokens: null });
  },
  refreshTokens: (tokens: Tokens) => {
    if (tokens) {
      set({ tokens });
    }
  },
  updateUserDetails: (response: UpdateUserResponse) => {
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            ...response,
          }
        : state.user,
    }));
  },
  updateUserAvatar: (avatar: UserAvatar) => {
    console.log("User Avatar: ",avatar);

    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            avatar: avatar,
          }
        : state.user,
    }));
  },
  checkIsAuthenticated: () => {
    const user = get().user;
    return user ? user.isAuthenticated : false;
  },
}));

export default useAuthStore;
