// app/store/page.tsx (this is a SERVER component by default)
"use client"; // this line is necessary to make this a CLIENT component
// export const metadata = {
//   title: "Store | Kitchen Sink",
// };
import { useRequireProfile } from "@repo/zustand";
import { useRouter } from "next/navigation";
import MainFeed from '../components/MainFeed';
import { useFeedData } from '../features/hooks/useFeedData';
import {LoadingSpinner} from '@repo/ui';
export default function StorePage() {
  const router = useRouter();
  const { profile, loading } = useRequireProfile(router);

  const {
    feeds,
    reels,
    loading: feedsLoading,
    showComments,
    newComment,
    loadingComments,
    submittingComment,
    likedFeeds,
    likingFeed,
    toggleComments,
    handleAddComment,
    handleCommentChange,
    handleToggleLike
  } = useFeedData();

  if (loading || !profile) {
    return <p>Loading...</p>;
  }

  if (feedsLoading) {
    return (
      <div className="loading-spinner" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px'
      }}>
        <LoadingSpinner size="large" color="#1877f2" />
        <div style={{ marginLeft: '10px' }}>Loading feed...</div>
      </div>
    );
  }

  return (
    <MainFeed
      feeds={feeds}
      reels={reels}
      showComments={showComments}
      newComment={newComment}
      loadingComments={loadingComments}
      submittingComment={submittingComment}
      likedFeeds={likedFeeds}
      likingFeed={likingFeed}
      toggleComments={toggleComments}
      handleAddComment={handleAddComment}
      handleCommentChange={handleCommentChange}
      handleToggleLike={handleToggleLike}
    />
  );
}
