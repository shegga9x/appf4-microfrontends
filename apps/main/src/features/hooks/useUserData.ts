import { useEffect, useState } from 'react';
import type { UserDTO } from "@repo/api-client";
import { fetchUser, getCurrentUserId } from '../services/userService';
import { useSearchParams } from 'next/navigation';

export function useUserData() {
    const searchParams = useSearchParams();
    const [profile, setProfile] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Get user id from url (?id=...), or from cookie if not present
    let id = searchParams?.get('id');

    if (!id) {
        id = getCurrentUserId();
    }

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        fetchUser(id)
            .then((user) => {
                if (isMounted) {
                    setProfile(user);
                    setLoading(false);
                }
            })
            .catch((e) => {
                console.log('Failed to fetch user:', e);
                

                if (isMounted) {
                    // setError('Failed to fetch user');
                    setLoading(false);
                }
            });
        return () => {
            isMounted = false;
        };
    }, [id]);

    return { profile, loading, error };
}
