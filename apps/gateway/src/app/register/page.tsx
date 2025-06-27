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

  // Don't render register form if user is already authenticated
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
            Join AppF4 and connect with friends and the world around you.
          </p>
        </div>

        {/* Right Side - Register Section */}
        <div className="login-form-container">
          <div className="login-card">
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1877f2' }}>
              Create New Account
            </h2>
            
            {!registrationTabOpened ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p style={{ marginBottom: '20px', color: '#606770' }}>
                  To create a new account, we'll open our secure registration page in a new tab.
                </p>
                
                <button 
                  onClick={handleRegisterRedirect}
                  className="login-button"
                  style={{ backgroundColor: '#42b883', width: '100%' }}
                >
                  Open Registration Page
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ 
                  backgroundColor: '#d4edda', 
                  color: '#155724', 
                  padding: '15px', 
                  borderRadius: '4px', 
                  marginBottom: '20px',
                  border: '1px solid #c3e6cb'
                }}>
                  <strong>Registration page opened!</strong>
                  <br />
                  Please complete your registration in the new tab, then return here to log in.
                </div>
                
                <p style={{ marginBottom: '20px', color: '#606770' }}>
                  After completing registration, come back and log in with your new credentials.
                </p>
                
                <button 
                  onClick={handleBackToLogin}
                  className="login-button"
                  style={{ backgroundColor: '#1877f2', width: '100%' }}
                >
                  Go to Login Page
                </button>
                
                <div style={{ margin: '15px 0' }}>
                  <button 
                    onClick={handleRegisterRedirect}
                    style={{ 
                      background: 'none', 
                      border: 'none', 
                      color: '#1877f2', 
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      fontSize: '14px'
                    }}
                  >
                    Open registration page again
                  </button>
                </div>
              </div>
            )}

            <div className="divider"></div>

            <div style={{ textAlign: 'center' }}>
              <span>Already have an account? </span>
              <button 
                onClick={() => router.push('/login')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#1877f2', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
