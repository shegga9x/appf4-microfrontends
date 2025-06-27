import axios from 'axios';

const KEYCLOAK_URL = 'https://keycloak.appf4.io.vn/realms/jhipster/protocol/openid-connect';

// Login by username/password - returns tokens
export async function login(username: string, password: string) {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'password');
        params.append('client_id', 'web_app');
        params.append('username', username);
        params.append('password', password);

        console.log('Attempting login for user:', username);

        const response = await axios.post(`${KEYCLOAK_URL}/token`, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            },
        });

        console.log('Login successful, token received');
        return response.data;
    } catch (error: any) {
        console.error('Login failed:', error.response?.data || error.message);
        throw error;
    }
}

export async function refreshToken(refreshToken: string) {
    try {
        const params = new URLSearchParams();
        params.append('grant_type', 'refresh_token');
        params.append('client_id', 'web_app');
        params.append('refresh_token', refreshToken);

        const response = await axios.post(`${KEYCLOAK_URL}/token`, params.toString(), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json',
            },
        });

        console.log('Token refreshed successfully');
        return response.data;
    } catch (error: any) {
        console.error('Token refresh failed:', error.response?.data || error.message);
        throw error;
    }
}

// Get user info using access token
export async function getUserInfo(accessToken: string) {
    const response = await axios.get('https://keycloak.appf4.io.vn/realms/jhipster/account', {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    return response.data;
}
