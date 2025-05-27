import { useAuthStore } from '@repo/zustand';
// in shared package
import { loadEnv } from '@repo/next-scripts';
import { useEffect } from 'react';

loadEnv();
const LOGIN_URL = process.env.NEXT_PUBLIC_GATEWAY_URL + '/login';
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