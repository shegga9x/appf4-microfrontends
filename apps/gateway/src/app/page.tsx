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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {profile.username}!</h1>
            <p className="text-blue-100 opacity-90">Gateway to your microservices</p>
          </div>
          
          {/* Content */}
          <div className="p-8">
            <div className="bg-blue-50 dark:bg-gray-700/30 p-6 rounded-lg border-l-4 border-blue-500 mb-8">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                This is the gateway for my microservices. You can navigate to different services using the buttons below. 
                The admin panel is currently under development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Admin Card */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                    <span className="text-2xl">👨‍💼</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Admin Panel</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  Access administrative controls and system settings (Coming Soon)
                </p>
                <button 
                  disabled
                  className="w-full px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                >
                  <span className="mr-2">🔒</span> Under Development
                </button>
              </div>

              {/* Feed Card */}
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                    <span className="text-2xl">📰</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Feed</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow">
                  Explore and interact with the latest posts and updates
                </p>
                <a
                  href={post}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center"
                >
                  <span className="mr-2">→</span> Go to Feed
                </a>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
  )
}
