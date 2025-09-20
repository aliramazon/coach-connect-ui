import { create } from "zustand";
import type { User } from "../types/user";

export interface UserStore {
    user: User | null;
    impersonatedUser: User | null;
    csrfToken: string | null;
    isImpersonating: boolean;
    isProfileLoading: boolean;
    setUser: (user: User) => void;
    setImpersonatedUser: (user: User | null) => void;
    clearImpersonatedUser: () => void;
    setCsrfToken: (token: string) => void;
    setIsProfileLoading: (value: boolean) => void;
    logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    impersonatedUser: null,
    csrfToken: null,
    isImpersonating: false,
    isProfileLoading: true,

    setUser: (user) => set({ user }),
    setImpersonatedUser: (user) =>
        set({ impersonatedUser: user, isImpersonating: true }),
    clearImpersonatedUser: () =>
        set({ impersonatedUser: null, isImpersonating: false }),
    setCsrfToken: (token) => set({ csrfToken: token }),
    setIsProfileLoading: (value) => set({ isProfileLoading: value }),

    logout: () =>
        set({
            user: null,
            impersonatedUser: null,
            csrfToken: null,
            isImpersonating: false,
            isProfileLoading: false,
        }),
}));
