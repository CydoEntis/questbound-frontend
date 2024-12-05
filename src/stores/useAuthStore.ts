import { create } from "zustand";
import {
  AuthenticatedUser,
  LoginRequest,
  LoginResponse,
  TokensResponse,
  UserResponse,
} from "../features/auth/shared/types";
import { UpdateUserResponse } from "../features/account/shared/types";
import { UserAvatar } from "../features/avatars/shared/types";

export type AuthState = {
  user: AuthenticatedUser | null;
  tokens: TokensResponse | null;
  loginUser: (response: LoginResponse) => void;
  logoutUser: () => void;
  refreshTokens: (tokens: TokensResponse) => void;
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
  refreshTokens: (tokens: TokensResponse) => {
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
