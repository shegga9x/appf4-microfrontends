import React, { PropsWithChildren } from 'react';
import Navbar from '../../components/atoms/navbar';
import MainContentContainer from '../../components/common';

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
