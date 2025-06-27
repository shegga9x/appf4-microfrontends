// app/store/page.tsx (this is a SERVER component by default)
"use client"; // this line is necessary to make this a CLIENT component
// export const metadata = {
//   title: "Store | Kitchen Sink",
// };
import { useRequireProfile } from "@repo/zustand";
import { useRouter } from "next/navigation";
import MainFeed from '../components/MainFeed';
import { useFeedData } from '../features/hooks/useFeedData';

export default function StorePage() {
  const router = useRouter();
  const { profile, loading } = useRequireProfile(router);

  const {
    feeds,
    reels,
    showComments,
    newComment,
    toggleComments,
    handleCommentChange
  } = useFeedData();

  if (loading || !profile) {
    return <p>Loading...</p>; // show spinner or skeleton while redirecting
  }

  if (loading) {
    return (
      <div className="loading-spinner" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        Loading feed...
      </div>
    );
  }

  return (
    <MainFeed
      feeds={feeds}
      reels={reels}
      showComments={showComments}
      newComment={newComment}
      toggleComments={toggleComments}
      handleCommentChange={handleCommentChange}
    />
  );
}
