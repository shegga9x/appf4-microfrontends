'use client';

import { useState } from 'react';
import { useAuthStore } from '@repo/zustand';
import LoadingSpinner from './LoadingSpinner';

interface HeaderProps {
  userName?: string;
  userAvatar?: string;
}

export default function Header({ userName, userAvatar }: HeaderProps) {
  const logout = useAuthStore(state => state.logout);
  const profile = useAuthStore(state => state.profile);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsLoggingOut(true);
      try {
        logout();
      } finally {
        // Logout function handles redirect, so this may not execute
        setIsLoggingOut(false);
      }
    }
  };

  return (
    <header className="app-header">
      <div className="header-container">
        {/* Left side - Logo */}
        <div className="header-left">
          <h1 className="app-logo">AppF4</h1>
        </div>

        {/* Center - Search */}
        <div className="header-center">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="Search AppF4" 
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        {/* Right side - User menu */}
        <div className="header-right">
          <div className="user-menu">
            <img 
              src={userAvatar || profile?.userAvatar || 'https://randomuser.me/api/portraits/women/9.jpg'} 
              alt="Profile" 
              className="profile-avatar"
            />
            <span className="profile-name">
              {userName || profile?.firstName || profile?.username || 'User'}
            </span>
            <button 
              onClick={handleLogout}
              className="logout-button"
              disabled={isLoggingOut}
            >
              {isLoggingOut ? (
                <>
                  <LoadingSpinner size="small" color="#1c1e21" />
                  <span style={{ marginLeft: '4px' }}>Logging out...</span>
                </>
              ) : (
                'Logout'
              )}
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .app-header {
          background: white;
          border-bottom: 1px solid #dadde1;
          padding: 8px 16px;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
        }

        .header-left {
          flex: 1;
        }

        .app-logo {
          color: #1877f2;
          font-size: 32px;
          font-weight: bold;
          margin: 0;
          cursor: pointer;
        }

        .header-center {
          flex: 1;
          display: flex;
          justify-content: center;
          max-width: 600px;
        }

        .search-container {
          position: relative;
          width: 100%;
          max-width: 320px;
        }

        .search-input {
          width: 100%;
          padding: 8px 12px 8px 36px;
          border: none;
          border-radius: 20px;
          background: #f0f2f5;
          font-size: 15px;
          outline: none;
        }

        .search-input:focus {
          background: white;
          box-shadow: 0 0 0 2px #1877f2;
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #65676b;
        }

        .header-right {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }

        .user-menu {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .profile-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #1877f2;
        }

        .profile-name {
          font-weight: 600;
          color: #1c1e21;
          font-size: 15px;
        }

        .logout-button {
          background: #e4e6ea;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          font-weight: 600;
          color: #1c1e21;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          min-width: 80px;
          justify-content: center;
        }

        .logout-button:hover:not(:disabled) {
          background: #d8dadf;
        }

        .logout-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 0 8px;
          }

          .profile-name {
            display: none;
          }

          .search-container {
            max-width: 200px;
          }

          .app-logo {
            font-size: 24px;
          }
        }
      `}</style>
    </header>
  );
}