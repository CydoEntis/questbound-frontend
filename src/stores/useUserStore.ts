import { create } from "zustand";
import { User } from "../features/account/shared/account.types";
import { UserAvatar } from "../features/avatar/shared/avatar.types";

export type UserState = {
  user: User | null;
  setUser: (user: User) => void;
  updateUserAvatar: (avatar: UserAvatar) => void;
  updateUserGold: (gold: number) => void;
};

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: User) => {
    set({ user });
  },
  updateUserAvatar: (avatar: UserAvatar) => {
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            avatar,
          }
        : state.user,
    }));
  },
  updateUserGold: (gold: number) => {
    set((state) => ({
      user: state.user
        ? {
            ...state.user,
            gold,
          }
        : state.user,
    }));
  },
}));

export default useUserStore;
