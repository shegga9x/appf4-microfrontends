'use client'; // Marks this as a client component (needed for Zustand and useEffect)

import { useEffect } from 'react';
import Header from '../components/Header';
import LeftSidebar from '../components/LeftSidebar';
import RightSidebar from '../components/RightSidebar';
import { useAuthStore } from '@repo/zustand';
import '../styles/styles.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initializeFromCookies = useAuthStore((state) => state.initializeFromCookies);

  useEffect(() => {
    initializeFromCookies();
  }, [initializeFromCookies]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Facebook Clone</title>
        <meta name="description" content="React facebook clone" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        {/* Font Awesome CDN */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css"
        />
      </head>
      <body className="bg-[#f0f2f5] dark:bg-[#18191A]">
        <div className="fb-container">
          {/* <Header /> */}
          <div className="fb-main flex">
            {/* <LeftSidebar /> */}
            <main className="flex-1">{children}</main>
            {/* <RightSidebar /> */}
          </div>
        </div>
      </body>
    </html>
  );
}
