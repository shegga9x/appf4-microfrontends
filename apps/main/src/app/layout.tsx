"use client"; // this line is necessary to make this a CLIENT component

import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import type { Metadata } from 'next';
import "../styles/styles.css";
import { useAuthStore } from "@repo/zustand";
import { useEffect } from "react";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeFromCookies = useAuthStore((state) => state.initializeFromCookies);

  useEffect(() => {
    // Initialize auth state from cookies on app startup
    initializeFromCookies();
  }, [initializeFromCookies]);
  return (
    <html lang="en" suppressHydrationWarning >
      <body>
        <div className="fb-container">
          {/* Facebook-like Header */}
          <Header />

          <div className="fb-main">
            {/* Left Sidebar */}
            <LeftSidebar />

            {/* Main Content Area */}
            {children}

            {/* Right Sidebar */}
            <RightSidebar />
          </div>
        </div>
      </body>
    </html>
  );
}
