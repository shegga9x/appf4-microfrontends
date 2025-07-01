'use client';

import { NewsFeedLayout } from '@repo/ui';
import React from 'react';

export default function FeedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NewsFeedLayout>{children}</NewsFeedLayout>;
}
