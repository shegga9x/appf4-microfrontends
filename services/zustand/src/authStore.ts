
import { create } from 'zustand';
import { login as apiLogin, getUserInfo } from '@repo/api-client';
import { useEffect } from 'react';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    profile: any | null;
    loading: boolean;
    error: string | null;

    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
    accessToken: null,
    refreshToken: null,
    profile: null,
    loading: false,
    error: null,

    login: async (username, password) => {
        set({ loading: true, error: null });
        try {
            const tokens = await apiLogin(username, password);
            set({
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                loading: false,
            });
            await get().fetchProfile();
        } catch (err: any) {
            set({ error: err?.response?.data?.error || 'Login failed', loading: false });
        }
    },

    fetchProfile: async () => {
        const token = get().accessToken;
        if (!token) return;

        try {
            const profile = await getUserInfo(token);
            set({ profile });
        } catch {
            set({ profile: null });
        }
    },

    logout: () => {
        set({
            accessToken: null,
            refreshToken: null,
            profile: null,
            error: null,
        });
    },
}));



// Provide a fallback value and ensure it's available on the client
const LOGIN_URL = (typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_GATEWAY_URL) + '/login';

export function useRequireProfile(router: any) {
    const profile = useAuthStore((s) => s.profile);
    const loading = useAuthStore((s) => s.loading);

    useEffect(() => {
        if (!loading && !profile) {
            window.location.href = LOGIN_URL;
        }
    }, [loading, profile, router]);

    return { profile, loading };
}