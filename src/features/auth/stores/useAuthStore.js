import { create } from 'zustand';
import { authService } from '@/services/auth.service';

export const useAuthStore = create((set) => ({
  user: null,
  session: null,
  loading: true,
  error: null,

  setUser: (user) => set({ user, loading: false }),
  setSession: (session) => set({ session, loading: false }),

  signUp: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.signUp(email, password);
      set({ user: data.user, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  signIn: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const data = await authService.signIn(email, password);
      set({ user: data.user, session: data.session, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  signOut: async () => {
    set({ loading: true, error: null });
    try {
      await authService.signOut();
      set({ user: null, session: null, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  checkSession: async () => {
    set({ loading: true });
    try {
      const user = await authService.getCurrentUser();
      set({ user, loading: false });
    } catch (err) {
      set({ user: null, loading: false });
    }
  }
}));
