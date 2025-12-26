
import { create } from "zustand";

type User = {
  id: string;
  role: string;
  email: string;
  name: string;
  country?: string;
};

type AuthStore = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  restoreUser: () => void;
  logout: () => void;
};

export const useAuth = create<AuthStore>((set) => ({
  user: null,
  loading: true,

  setUser: (user) => set({ user, loading: false }),

  restoreUser: () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null });
    window.location.href = "/login";
  },
}));





