import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  redirectAfterLogin: string | null;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setRedirectAfterLogin: (path: string | null) => void;
}

function setCookie(name: string, value: string, days: number = 7) {
  if (typeof document === "undefined") return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

function deleteCookie(name: string) {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      redirectAfterLogin: null,
      login: (user) => {
        set({ user, isAuthenticated: true });
        // Sync to cookie for middleware
        setCookie("auth-storage", JSON.stringify({ state: { isAuthenticated: true } }));
      },
      logout: () => {
        set({ user: null, isAuthenticated: false, redirectAfterLogin: null });
        deleteCookie("auth-storage");
      },
      setLoading: (loading) => set({ isLoading: loading }),
      setRedirectAfterLogin: (path) => set({ redirectAfterLogin: path }),
    }),
    {
      name: "auth-storage",
    }
  )
);
