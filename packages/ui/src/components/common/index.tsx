"use client";
import React, { PropsWithChildren } from 'react';

const MainContentContainer: React.FC<PropsWithChildren> = ({ children }) => {
  return <main className="mt-14 min-h-[calc(100%-4rem)]">{children}</main>;
};

export default MainContentContainer;
