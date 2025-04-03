import type { User } from "@supabase/supabase-js";
import { create } from "zustand";

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isAuthenticatedLocal: boolean;
  setIsAuthenticatedLocal: (isAuthenticatedLocal: boolean) => void;
}

export const useUserStore = create<UserState>()((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  setIsLoading: (isLoading) => set({ isLoading }),
  isAuthenticatedLocal: false,
  setIsAuthenticatedLocal: (isAuthenticatedLocal) => set({ isAuthenticatedLocal }),
}));
