import type { UserDTO } from "@repo/api-client";
import { createUserApi } from '../api/config';
import { sharedCookies } from '@repo/shared-cookies';
import { useEffect, useState } from 'react';

// Get current user ID helper function
const getCurrentUserId = (): string => {
    const userId = sharedCookies.getUserId();
    return userId || 'anonymous-user';
};

// Fetch user by id, or current user if id is not provided
export const fetchUser = async (id?: string): Promise<UserDTO | null> => {
    const userId = id || getCurrentUserId();
    try {
        const userApi = createUserApi();
        const userResponse = await userApi.getUser(userId);
        return userResponse.data;
    } catch (error) {
        console.error('Failed to fetch user:', error);
        return null;
    }
};



// Export the helper function for use in other modules
export { getCurrentUserId };
