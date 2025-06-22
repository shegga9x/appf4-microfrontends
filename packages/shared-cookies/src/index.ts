import Cookies from 'js-cookie';

interface CookieOptions {
  expires?: number | Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

class SharedCookieManager {
  private domain: string;
  private isProduction: boolean;

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production';
    
    // In production, use your main domain (e.g., '.yourdomain.com')
    // In development, use localhost
    this.domain = this.isProduction 
      ? 'https://appf4social.vercel.app'
      : 'https://appf4social.vercel.app';
  }

  private getDefaultOptions(): CookieOptions {
    return {
      domain: this.domain,
      path: '/',
      secure: this.isProduction,
      sameSite: this.isProduction ? 'lax' : 'lax',
    };
  }

  // Set a cookie that's shared across all zones
  setCookie(name: string, value: string, options: Partial<CookieOptions> = {}): void {
    const finalOptions = {
      ...this.getDefaultOptions(),
      ...options,
    };

    Cookies.set(name, value, finalOptions);
  }

  // Get a cookie value
  getCookie(name: string): string | undefined {
    return Cookies.get(name);
  }

  // Remove a cookie from all zones
  removeCookie(name: string): void {
    const options = {
      domain: this.domain,
      path: '/',
    };

    Cookies.remove(name, options);
  }

  // Set authentication tokens with appropriate expiration
  setAuthTokens(accessToken: string, refreshToken: string): void {
    this.setCookie('accessToken', accessToken, {
      expires: 1, // 1 day
    });
    
    this.setCookie('refreshToken', refreshToken, {
      expires: 7, // 7 days
    });
  }

  // Get authentication tokens
  getAuthTokens(): { accessToken?: string; refreshToken?: string } {
    return {
      accessToken: this.getCookie('accessToken'),
      refreshToken: this.getCookie('refreshToken'),
    };
  }

  // Clear all authentication data
  clearAuth(): void {
    this.removeCookie('accessToken');
    this.removeCookie('refreshToken');
    this.removeCookie('userProfile');
  }

  // Set user profile data
  setUserProfile(profile: any): void {
    this.setCookie('userProfile', JSON.stringify(profile), {
      expires: 7,
    });
  }

  // Get user profile data
  getUserProfile(): any | null {
    const profileData = this.getCookie('userProfile');
    if (!profileData) return null;
    
    try {
      return JSON.parse(profileData);
    } catch {
      return null;
    }
  }
}

export const sharedCookies = new SharedCookieManager();
export default sharedCookies;