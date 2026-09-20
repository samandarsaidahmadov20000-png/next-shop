import { create } from "zustand";

type AuthStore = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  initialize: () => void;
};

export const authStore = create<AuthStore>((set) => ({
  isLoggedIn: false,

  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
  initialize: () => {
    const token = localStorage.getItem("token");

    if (token) {
      set({ isLoggedIn: true });
    }
  },
}));
