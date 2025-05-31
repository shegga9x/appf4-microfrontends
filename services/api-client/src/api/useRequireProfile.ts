import { useAuthStore } from '@repo/zustand';
import { useEffect } from 'react';



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