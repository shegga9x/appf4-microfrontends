// app/dashboard/page.tsx (or pages/dashboard.tsx, depending on your Next.js version)

'use client'
import { useRequireProfile } from "@repo/zustand";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const { profile, loading } = useRequireProfile(router);
  
  const docs = "/docs";
  const post = "/post";
  if (loading || !profile) {
    return <p>Loading...</p>
  }
  
  
  return (
    <>
      <div className="dashboard-container flex flex-col items-center justify-center min-h-screen bg-white dark:bg-neutral-900">
        <h1 className="text-3xl font-bold mb-4 text-black dark:text-gray-200">Welcome, {profile.username}!</h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">This is your protected dashboard.</p>
        <div className="navigation-buttons flex gap-4">
          <a
            href={docs}
            className="nav-link main-link px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            📝 docs
          </a>
          <a
            href={post}
            className="nav-link main-link px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            📝 post
          </a>
        </div>
      </div>
    </>
  )
}
