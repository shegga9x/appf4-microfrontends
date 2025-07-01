'use client';

import { MarketplacePage } from '@repo/ui';
import React from 'react';

export default function MarketLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MarketplacePage>{children}</MarketplacePage>;
}
