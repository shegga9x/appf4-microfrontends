'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@repo/zustand';

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const login = useAuthStore(state => state.login);
  const loading = useAuthStore(state => state.loading);
  const error = useAuthStore(state => state.error);
  const profile = useAuthStore(state => state.profile);
  const initialized = useAuthStore(state => state.initialized);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isChecking, setIsChecking] = useState(true);
  const [registrationMessage, setRegistrationMessage] = useState('');

  useEffect(() => {
    // Check for registration success message
    const message = searchParams?.get('message');
    if (message) {
      setRegistrationMessage(message);
    }
    
    if (initialized) {
      setIsChecking(false);
      if (profile) {
        console.log('User already logged in, redirecting to home');
        router.push('/');
      }
    }
  }, [initialized, profile, router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await login(username, password);

    if (!error) {
      router.push('/');
    }
  };

  // Show loading state while checking authentication
  if (isChecking || !initialized) {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-form-container">
            <div className="login-card">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>Checking authentication...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Don't render login form if user is already authenticated
  if (profile) {
    return (
      <div className="login-container">
        <div className="login-wrapper">
          <div className="login-form-container">
            <div className="login-card">
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div>You are already logged in. Redirecting...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left Side - Brand Section */}
        <div className="login-brand">
          <h1 className="brand-title">AppF4</h1>
          <p className="brand-subtitle">
            Connect with friends and the world around you on AppF4.
          </p>
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-container">
          <div className="login-card">
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email or phone number"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              
              {registrationMessage && (
                <div style={{ 
                  backgroundColor: '#d4edda', 
                  color: '#155724', 
                  padding: '10px', 
                  borderRadius: '4px', 
                  marginBottom: '15px',
                  border: '1px solid #c3e6cb'
                }}>
                  {registrationMessage}
                </div>
              )}

              {error && (
                <div className="error-message">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="login-button"
              >
                {loading ? 'Logging in...' : 'Log In'}
              </button>
            </form>

            <a href="#" className="forgot-password">
              Forgotten password?
            </a>

            <div className="divider"></div>

            <button 
              onClick={() => router.push('/register')}
              className="create-account-button"
            >
              Create New Account
            </button>
          </div>

          <div className="create-page-text">
            <strong>Create a Page</strong> for a celebrity, brand or business.
          </div>
        </div>
      </div>
    </div>
  );
}
