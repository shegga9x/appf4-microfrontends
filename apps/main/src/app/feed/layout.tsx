import React, { ReactNode } from 'react';
import Navbar from '../../components/atoms/navbar';
import MainContentContainer from '../../components/common';
import LeftSidebar from '../../components/organisms/newsfeed/LeftSidebar';
import RightSidebar from '../../components/organisms/newsfeed/RightSidebar';

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
