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
      <div className="dashboard-container">
        <h1>Welcome, {profile.username}!</h1>
        <p>This is your protected dashboard.</p>
        <div className="navigation-buttons">
          <a
            href={docs}
            className="nav-link main-link"
          >
            📝 docs
          </a>
          <a
            href={post}
            className="nav-link main-link"
          >
            📝 post
          </a>
        </div>
      </div></>
  )
}
