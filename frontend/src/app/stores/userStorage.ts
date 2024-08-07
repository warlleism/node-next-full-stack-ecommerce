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
        const user = JSON.parse(storedUser)
        user.isAdmin = JSON.parse(user.isAdmin);
        set({ user: user });
      }
    }
  },
}));

export default useUserStore;
