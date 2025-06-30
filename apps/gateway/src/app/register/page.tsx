'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@repo/zustand';

export default function Register() {
  const router = useRouter();
  
  const profile = useAuthStore(state => state.profile);
  const initialized = useAuthStore(state => state.initialized);

  const [isChecking, setIsChecking] = useState(true);
  const [registrationTabOpened, setRegistrationTabOpened] = useState(false);

  useEffect(() => {
    if (initialized) {
      setIsChecking(false);
      if (profile) {
        console.log('User already logged in, redirecting to home');
        router.push('/');
      }
    }
  }, [initialized, profile, router]);

  const handleRegisterRedirect = () => {
    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
    const redirectUri = `${currentOrigin}/login`;
    
    const keycloakRegisterUrl = 
      `https://keycloak.appf4.io.vn/realms/jhipster/protocol/openid-connect/registrations?` +
      `client_id=web_app&` +
      `response_type=code&` +
      `scope=openid&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}`;
    
    // Open registration in a new tab
    const registrationTab = window.open(keycloakRegisterUrl, '_blank', 'noopener,noreferrer');
    
    if (registrationTab) {
      setRegistrationTabOpened(true);
      console.log('Registration tab opened successfully');
    } else {
      alert('Please allow popups for this site to open the registration page.');
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  // Show loading state while checking authentication
  if (isChecking || !initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="loader"></div>
      </div>
    );
  }

  // Don't render register form if user is already authenticated
  if (profile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <div className="rounded bg-neutral-800 p-8 shadow-xl">
          <div className="text-center text-white">You are already logged in. Redirecting...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-900 px-4">
      <div className="flex w-full max-w-2xl items-center justify-center gap-8">
        {/* Left Side - Brand Section */}
        <div className="hidden w-1/2 flex-col justify-center md:flex">
          <h1 className="text-5xl font-extrabold text-blue-600 mb-4 font-sans">AppF4</h1>
          <p className="text-xl text-gray-100 font-normal">
            Join AppF4 and connect with friends and the world around you.
          </p>
        </div>

        {/* Right Side - Register Section */}
        <div className="w-full max-w-md rounded-xl bg-neutral-800 p-8 shadow-2xl">
          <h2 className="mb-6 text-center text-2xl font-bold text-blue-600 dark:text-white">
            Create New Account
          </h2>
          {!registrationTabOpened ? (
            <div className="text-center text-gray-200">
              <p className="mb-6 text-gray-400">
                To create a new account, we'll open our secure registration page in a new tab.
              </p>
              <button
                onClick={handleRegisterRedirect}
                className="w-full rounded bg-green-600 py-2 font-semibold text-white hover:bg-green-700 transition"
              >
                Open Registration Page
              </button>
            </div>
          ) : (
            <div className="text-center text-gray-200">
              <div className="mb-4 rounded border border-green-300 bg-green-100 p-4 text-green-800 dark:bg-green-900 dark:text-green-200">
                <strong>Registration page opened!</strong>
                <br />
                Please complete your registration in the new tab, then return here to log in.
              </div>
              <p className="mb-4 text-gray-400">
                After completing registration, come back and log in with your new credentials.
              </p>
              <button
                onClick={handleBackToLogin}
                className="w-full rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 transition"
              >
                Go to Login Page
              </button>
              <div className="my-3">
                <button
                  onClick={handleRegisterRedirect}
                  className="text-blue-400 underline hover:text-blue-300 text-sm"
                >
                  Open registration page again
                </button>
              </div>
            </div>
          )}

          <div className="border-t border-neutral-700 my-6"></div>

          <div className="text-center">
            <span className="text-gray-300">Already have an account? </span>
            <button
              onClick={() => router.push('/login')}
              className="text-blue-400 underline hover:text-blue-300"
            >
              Log In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
