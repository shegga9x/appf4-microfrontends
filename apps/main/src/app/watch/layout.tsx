'use client';

import { WatchPageLayout } from '@repo/ui';
import React from 'react';

export default function WatchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WatchPageLayout>{children}</WatchPageLayout>;
}
