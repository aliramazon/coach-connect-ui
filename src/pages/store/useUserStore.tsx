import { create } from "zustand";
import type { User } from "../../types/user";

export interface UserStore {
    user: User | null;
    impersonatedUser: User | null;
    csrfToken: string | null;
    setUser: (user: User) => void;
    setImpersonatedUser: (user: User | null) => void;
    clearImpersonatedUser: () => void;
    setCsrfToken: (token: string) => void;
    logout: () => void;
    isImpersonating: boolean;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    impersonatedUser: null,
    csrfToken: null,
    isImpersonating: false,

    setUser: (user) => set({ user }),
    setImpersonatedUser: (user) =>
        set({ impersonatedUser: user, isImpersonating: true }),
    clearImpersonatedUser: () =>
        set({ impersonatedUser: null, isImpersonating: false }),
    setCsrfToken: (token) => set({ csrfToken: token }),

    logout: () =>
        set({
            user: null,
            impersonatedUser: null,
            csrfToken: null,
            isImpersonating: false,
        }),
}));
