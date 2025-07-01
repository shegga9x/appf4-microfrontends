'use client';

import { GamingPageLayout } from '@repo/ui';
import React from 'react';

export default function GamingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GamingPageLayout>{children}</GamingPageLayout>;
}
