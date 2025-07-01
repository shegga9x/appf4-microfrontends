'use client';

import React from 'react';
import { useRequireProfile } from '@repo/zustand';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@repo/ui';

export default function WatchPage() {
  const router = useRouter();
  const { profile, loading } = useRequireProfile(router);

  if (loading || !profile) {
    return <div className="h-screen flex items-center justify-center"><LoadingSpinner size="large" /></div>;
  }

  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-[80vh]">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-200">Watch</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400">Content coming soon...</p>
    </div>
  );
}
