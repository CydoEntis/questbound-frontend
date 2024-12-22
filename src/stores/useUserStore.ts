import { create } from "zustand";

export type UserState = {
  userId: string | null;
  setUserId: (userId: string) => void;
};

const useUserStore = create<UserState>((set) => ({
  userId: null,
  setUserId: (userId: string) => {
    set({ userId });
  },
}));

export default useUserStore;
