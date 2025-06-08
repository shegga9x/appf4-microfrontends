import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { login as apiLogin, getUserInfo } from '@repo/api-client';
import { sharedCookies } from '@repo/shared-cookies';
import { useEffect, useSyncExternalStore } from 'react';
import { log } from "@repo/logger";

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    profile: any | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;

    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
    initializeFromCookies: () => Promise<void>;
}

// Create store with subscribeWithSelector middleware for better SSR support
export const useAuthStore = create<AuthState>()(
    subscribeWithSelector((set, get) => ({
        accessToken: null,
        refreshToken: null,
        profile: null,
        loading: false,
        error: null,
        initialized: false,

        login: async (username, password) => {
            set({ loading: true, error: null });
            try {
                const tokens = await apiLogin(username, password);

                sharedCookies.setAuthTokens(tokens.access_token, tokens.refresh_token);

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
                sharedCookies.setUserProfile(profile);
                set({ profile });
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                set({ profile: null });
            }
        },

        initializeFromCookies: async () => {
            if (get().initialized) return;

            set({ loading: true });

            try {
                // Only access cookies on client side
                if (typeof window !== 'undefined') {
                    const { accessToken, refreshToken } = sharedCookies.getAuthTokens();
                    const profile = sharedCookies.getUserProfile();

                    console.log('Initializing auth with cookies:', {
                        hasAccessToken: !!accessToken,
                        hasProfile: !!profile
                    });

                    if (accessToken) {
                        set({
                            accessToken,
                            refreshToken,
                            profile,
                            loading: false,
                            initialized: true
                        });

                        if (!profile) {
                            await get().fetchProfile();
                        }
                    } else {
                        set({
                            loading: false,
                            initialized: true
                        });
                    }
                } else {
                    // Server-side: just mark as initialized with default values
                    set({
                        loading: false,
                        initialized: true
                    });
                }
            } catch (error) {
                console.error('Auth initialization failed:', error);
                set({
                    loading: false,
                    initialized: true
                });
            }
        },

        logout: () => {
            if (typeof window !== 'undefined') {
                sharedCookies.clearAuth();
            }
            set({
                accessToken: null,
                refreshToken: null,
                profile: null,
                error: null,
                initialized: true
            });
        },
    }))
);

// Cached server snapshot to prevent infinite loops
let serverSnapshot: Partial<AuthState> | null = null;

// Custom hook that properly handles SSR with cached server snapshot
export function useAuthStoreSSR() {
    const getSnapshot = () => useAuthStore.getState();
    
    const getServerSnapshot = () => {
        if (serverSnapshot === null) {
            serverSnapshot = {
                accessToken: null,
                refreshToken: null,
                profile: null,
                loading: false,
                error: null,
                initialized: false,
            };
        }
        return serverSnapshot as AuthState;
    };

    const subscribe = (onStoreChange: () => void) => {
        return useAuthStore.subscribe(onStoreChange);
    };

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// Updated useRequireProfile hook that uses the SSR-safe store
export function useRequireProfile(router: any) {
    const authState = useAuthStoreSSR();
    const initializeFromCookies = useAuthStore((state) => state.initializeFromCookies);

    // Initialize auth on client side only
    useEffect(() => {
        if (typeof window !== 'undefined' && !authState.initialized) {
            console.log('useRequireProfile - initializing auth');
            initializeFromCookies();
        }
    }, [authState.initialized, initializeFromCookies]);

    // Handle redirect after initialization is complete
    useEffect(() => {
        if (typeof window !== 'undefined' && authState.initialized && !authState.loading && !authState.profile) {
            console.log('Redirecting to login - no profile found after initialization');
            window.location.href = '/login';
        }
    }, [authState.initialized, authState.loading, authState.profile]);

    return { 
        profile: authState.profile, 
        loading: authState.loading || !authState.initialized,
        initialized: authState.initialized 
    };
}