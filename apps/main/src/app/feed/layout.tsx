"use client";
import React, { ReactNode } from 'react';
import { Navbar, MainContentContainer, RightSidebar } from '@repo/ui';

export default function FeedLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full w-full flex-col">
      <Navbar />
      <MainContentContainer>
        <div className="flex">
          <div className="flex-1">{children}</div>
          <RightSidebar />
        </div>
      </MainContentContainer>
    </div>
  );
}
