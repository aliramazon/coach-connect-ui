import { create } from "zustand";
import type { User } from "../../types/user";

export interface UserStore {
    user: User | null;
    impersonatedUser?: User;
    csrfToken: string | null;
    setUser: (user: User) => void;
    setImpersonatedUser: (user: User) => void;
    clearImpersonatedUser: () => void;
    setCsrfToken: (token: string) => void;
    logout: () => void;
}

export const useUser = create<UserStore>((set) => ({
    user: null,
    impersonatedUser: undefined,
    csrfToken: null,

    setUser: (user) => set({ user }),
    setImpersonatedUser: (user) => set({ impersonatedUser: user }),
    clearImpersonatedUser: () => set({ impersonatedUser: undefined }),
    setCsrfToken: (token) => set({ csrfToken: token }),

    logout: () =>
        set({
            user: null,
            impersonatedUser: undefined,
            csrfToken: null,
        }),
}));
