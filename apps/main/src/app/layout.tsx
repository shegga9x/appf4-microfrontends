"use client";
import "./styles.css";
import "./styles.css";
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
      <body>{children}</body>
    </html>
  );
}
