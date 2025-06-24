import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { login as apiLogin, getUserInfo, refreshToken as apiRefreshToken } from '@repo/api-client';
import { sharedCookies } from '@repo/shared-cookies';
import { useEffect, useSyncExternalStore } from 'react';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    profile: any | null;
    loading: boolean;
    error: string | null;
    initialized: boolean;
    tokenExpiresAt: number | null;
    isRefreshing: boolean; // Add to prevent refresh loops

    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    fetchProfile: () => Promise<void>;
    initializeFromCookies: () => Promise<void>;
    refreshTokens: () => Promise<boolean>;
    isTokenExpired: () => boolean;
    scheduleTokenRefresh: () => void;
}

// Helper function to decode JWT and get expiration time
function getTokenExpirationTime(token: string): number | null {
    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const expTime = payload.exp ? payload.exp * 1000 : null;

        if (expTime) {
            const now = Date.now();
            const timeUntilExp = expTime - now;
            console.log(`🕐 Token expires in ${Math.round(timeUntilExp / 1000 / 60)} minutes`);
        }

        return expTime;
    } catch (error) {
        console.error('Failed to decode token:', error);
        return null;
    }
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
        tokenExpiresAt: null,
        isRefreshing: false,

        login: async (username, password) => {
            set({ loading: true, error: null });
            try {
                const tokens = await apiLogin(username, password);
                const expiresAt = getTokenExpirationTime(tokens.access_token);

                sharedCookies.setAuthTokens(tokens.access_token, tokens.refresh_token);

                set({
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                    tokenExpiresAt: expiresAt,
                    loading: false,
                });

                // Schedule automatic token refresh
                get().scheduleTokenRefresh();

                await get().fetchProfile();
            } catch (err: any) {
                set({ error: err?.response?.data?.error || 'Login failed', loading: false });
            }
        },

        refreshTokens: async () => {
            const { refreshToken: currentRefreshToken, isRefreshing } = get();

            // Prevent multiple refresh attempts
            if (isRefreshing) {
                console.log('🔄 Refresh already in progress, skipping...');
                return false;
            }

            if (!currentRefreshToken) {
                console.warn('No refresh token available');
                get().logout();
                return false;
            }

            try {
                // set({ isRefreshing: true, loading: true });
                console.log('🔄 Starting token refresh...');

                const newTokens = await apiRefreshToken(currentRefreshToken);
                const expiresAt = getTokenExpirationTime(newTokens.access_token);

                sharedCookies.setAuthTokens(newTokens.access_token, newTokens.refresh_token);

                set({
                    accessToken: newTokens.access_token,
                    refreshToken: newTokens.refresh_token,
                    tokenExpiresAt: expiresAt,
                    loading: false,
                    error: null,
                    isRefreshing: false
                });

                // Schedule next automatic refresh
                get().scheduleTokenRefresh();

                console.log('✅ Tokens refreshed successfully');
                return true;
            } catch (error) {
                console.error('❌ Token refresh failed:', error);

                set({ isRefreshing: false, loading: false });

                // Clear invalid tokens and redirect to login
                get().logout();
                return false;
            }
        },

        isTokenExpired: () => {
            const { tokenExpiresAt } = get();
            if (!tokenExpiresAt) {
                console.log('⚠️ No token expiration time available');
                return true;
            }

            const now = Date.now();
            const timeUntilExp = tokenExpiresAt - now;

            // Only consider token expired if it expires within 1 minute (much more conservative)
            // This prevents unnecessary refreshes on page reload
            const isExpired = timeUntilExp <= (1 * 60 * 1000); // 1 minute buffer

            if (timeUntilExp <= 0) {
                console.log(`⏰ Token has actually expired ${Math.abs(Math.round(timeUntilExp / 1000))} seconds ago`);
                return true;
            } else if (isExpired) {
                console.log(`⏰ Token will expire in ${Math.round(timeUntilExp / 1000)} seconds - considering expired`);
            } else {
                console.log(`✅ Token is valid for ${Math.round(timeUntilExp / 1000 / 60)} more minutes`);
            }

            return isExpired;
        },

        scheduleTokenRefresh: () => {
            const { tokenExpiresAt } = get();

            if (!tokenExpiresAt) {
                console.log('⚠️ Cannot schedule refresh - no expiration time');
                return;
            }

            // Clear any existing timeout
            if (typeof window !== 'undefined' && (window as any).tokenRefreshTimeout) {
                clearTimeout((window as any).tokenRefreshTimeout);
                delete (window as any).tokenRefreshTimeout;
            }

            const now = Date.now();
            const timeUntilExp = tokenExpiresAt - now;

            // Schedule refresh 5 minutes before expiration (but only if there's enough time)
            const refreshBuffer = 5 * 60 * 1000; // 5 minutes
            const refreshTime = timeUntilExp - refreshBuffer;

            // Only schedule if token has more than 5 minutes left
            if (refreshTime > 60000) { // At least 1 minute from now
                if (typeof window !== 'undefined') {
                    (window as any).tokenRefreshTimeout = setTimeout(async () => {
                        console.log('🔄 Scheduled token refresh triggered');
                        await get().refreshTokens();
                    }, refreshTime);

                    console.log(`⏰ Token refresh scheduled in ${Math.round(refreshTime / 1000 / 60)} minutes`);
                }
            } else if (timeUntilExp > 60000) {
                // Token expires in less than 5 minutes but more than 1 minute
                // Schedule refresh for 1 minute from now
                if (typeof window !== 'undefined') {
                    (window as any).tokenRefreshTimeout = setTimeout(async () => {
                        console.log('🔄 Last-minute token refresh triggered');
                        await get().refreshTokens();
                    }, 60000); // 1 minute

                    console.log(`⏰ Last-minute token refresh scheduled in 1 minute`);
                }
            } else {
                console.log('⚠️ Token expires very soon, will refresh on next API call');
            }
        },

        fetchProfile: async () => {
            const { accessToken, isRefreshing } = get();
            if (!accessToken) return;

            // Check if token is expired before making request (but don't refresh here)
            if (get().isTokenExpired() && !isRefreshing) {
                console.log('Token expired during profile fetch, will refresh on next API call');
                return;
            }

            try {
                const profile = await getUserInfo(accessToken);
                sharedCookies.setUserProfile(profile);
                set({ profile });
            } catch (error) {
                console.error('Failed to fetch profile:', error);

                // Only try to refresh if we get a 401 and we're not already refreshing
                if ((error as any)?.response?.status === 401 && !isRefreshing) {
                    console.log('Profile fetch got 401, attempting token refresh...');
                    await get().refreshTokens();
                } else {
                    set({ profile: null });
                }
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
                    if (refreshToken) {
                        const expiresAt = getTokenExpirationTime(refreshToken);
                        const now = Date.now();
                        const isActuallyExpired = expiresAt ? (expiresAt <= now) : true;
                        if (isActuallyExpired) {
                            get().logout();
                        }

                    }

                    if (accessToken) {
                        const expiresAt = getTokenExpirationTime(accessToken);

                        set({
                            accessToken,
                            refreshToken,
                            profile,
                            tokenExpiresAt: expiresAt,
                            loading: false,
                            initialized: true
                        });

                        // Check if token is actually expired (not just "close to expiring")
                        const now = Date.now();
                        const isActuallyExpired = expiresAt ? (expiresAt <= now) : true;

                        if (isActuallyExpired) {
                            console.log('🔄 Token has actually expired during initialization, refreshing...');
                            const refreshed = await get().refreshTokens();

                            if (refreshed && !profile) {
                                await get().fetchProfile();
                            }
                        } else {
                            // Schedule automatic refresh for later
                            get().scheduleTokenRefresh();

                            if (!profile) {
                                await get().fetchProfile();
                            }
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
                    initialized: true,
                    isRefreshing: false
                });
            }
        },

        logout: () => {
            // Clear any scheduled token refresh
            if (typeof window !== 'undefined' && (window as any).tokenRefreshTimeout) {
                clearTimeout((window as any).tokenRefreshTimeout);
                delete (window as any).tokenRefreshTimeout;
            }

            if (typeof window !== 'undefined') {
                sharedCookies.clearAuth();
                window.location.href = '/login'; // Redirect to login page
            }

            set({
                accessToken: null,
                refreshToken: null,
                profile: null,
                error: null,
                tokenExpiresAt: null,
                initialized: true,
                isRefreshing: false
            });
        },
    }))
);

// Export the refresh function for use in API client
export const refreshTokens = () => useAuthStore.getState().refreshTokens();

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