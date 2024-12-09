import { create } from "zustand";
import { User } from "../features/account/shared/account.types";
import { UserAvatar } from "../features/avatar/shared/avatar.types";

export type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  // tokens: Tokens | null;
  loginUser: () => void;
  logoutUser: () => void;
  // refreshTokens: (tokens: Tokens) => void;
  setUser: (user: User) => void;
  // updateUserDetails: (response: UpdateUserResponse) => void;
  updateUserAvatar: (avatar: UserAvatar) => void;
  checkIsAuthenticated: () => boolean;
};

const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  tokens: null,

  loginUser: () => {
    set({ isAuthenticated: true });
  },
  logoutUser: () => {
    set({ isAuthenticated: false });
  },
  // refreshTokens: (tokens: Tokens) => {
  //   if (tokens) {
  //     set({ tokens });
  //   }
  // },
  setUser: (user: User) => {
    set({ user });
  },
  // updateUserDetails: (response: UpdateUserResponse) => {
  //   set((state) => ({
  //     user: state.user
  //       ? {
  //           ...state.user,
  //           ...response,
  //         }
  //       : state.user,
  //   }));
  // },
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
    const authenticated = get().isAuthenticated;
    if (authenticated) return true;
    return false;
  },
}));

export default useAuthStore;
