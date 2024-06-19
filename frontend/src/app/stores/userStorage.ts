import { create } from 'zustand';
import { User } from '../types/User';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  initializeUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    if (typeof window !== 'undefined') {
      localStorage.setItem('user', JSON.stringify(user));
    }
  },
  initializeUser: () => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        set({ user: JSON.parse(storedUser) });
      }
    }
  },
}));

export default useUserStore;
