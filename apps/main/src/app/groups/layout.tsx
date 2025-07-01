'use client';

import React from 'react';
import { WatchPageLayout } from '@repo/ui';

export default function GroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WatchPageLayout>{children}</WatchPageLayout>;
}
