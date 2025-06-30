"use client";
import React, { PropsWithChildren } from 'react';
import { Navbar, MainContentContainer } from '@repo/ui';

const ProfilePageLayout: React.FC<PropsWithChildren> = (props) => {
  const { children } = props;
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <MainContentContainer>{children}</MainContentContainer>
    </div>
  );
};

export default ProfilePageLayout;
