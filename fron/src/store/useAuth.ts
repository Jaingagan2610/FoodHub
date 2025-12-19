import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthState {
  user: any | null;
  token: string | null;
  login: (data: any) => void;
  logout: () => void;
}

export const useAuth = create<AuthState>((set) => ({
  user: null,
  token: null,

  login: (data) => {
    Cookies.set('token', data.access_token);
    set({ user: data.user, token: data.access_token });
  },

  logout: () => {
    Cookies.remove('token');
    set({ user: null, token: null });
  },
}));
