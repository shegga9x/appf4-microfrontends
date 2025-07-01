// app/store/page.tsx (this is a SERVER component by default)
"use client"; // this line is necessary to make this a CLIENT component
// export const metadata = {
//   title: "Store | Kitchen Sink",
// };
import { useRequireProfile } from "@repo/zustand";
import { useRouter } from "next/navigation";
import { useFeedData } from '../../features/hooks/useFeedData';
import { LoadingSpinner } from '@repo/ui';
import type { ReelDTO, FeedWithOtherDTO, CommentWithRedisUserDTO } from "@repo/api-client";
import CreatePostBox from '../../components/atoms/post/CreatePostBox';
import { Story } from '@repo/ui';
import PostContainer from '../../components/container/PostContainer';

interface MainFeedProps {
  feeds: FeedWithOtherDTO[];
  reels: ReelDTO[];
  showComments: Record<string, boolean>;
  newComment: Record<string, string>;
  loadingComments: Record<string, boolean>;
  submittingComment: Record<string, boolean>;
  likedFeeds: Record<string, boolean>;
  likingFeed: Record<string, boolean>;
  toggleComments: (feedId: string) => void;
  handleAddComment: (feedId: string) => void;
  handleCommentChange: (feedId: string, value: string) => void;
  handleToggleLike: (feedId: string) => void;
}

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

export function MainFeed({
  feeds,
  reels,
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
}: MainFeedProps) {
  return (
    <div className="mx-auto w-[42.5rem]">
      <div className="mt-6 h-full w-full pb-5">
        {/* Story Section */}
        <div className="h-50 my-6 flex w-full cursor-pointer items-center justify-center space-x-2 overflow-hidden">
          {[1, 2, 3, 4, 5].map((_, idx) => (
            <Story key={idx} story={{
              image: `https://picsum.photos/seed/story${idx + Math.floor(Math.random() * 1000)}/200/300`,
              user: {
                dp: `https://picsum.photos/seed/user${idx + Math.floor(Math.random() * 1000)}/100/100`,
                fullName: `User ${idx + 1}`,
                randomGif: `https://media.giphy.com/media/${["l0MYB8Ory7Hqefo9a", "xT9IgDEI1iZyb2wqo8", "3oz8xEIQhJbV8xctdC", "26ufdipQqU2lhNA4g", "5GoVLqeAOo6PK/giphy.gif"][Math.floor(Math.random() * 5)]}/giphy.gif`
              }
            }} />
          ))}
        </div>
        {/* Create Post */}
        <CreatePostBox />
        {/* All posts */}
        <PostContainer
          feeds={feeds}
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
        {/* Reels Section - Using ReelDTO */}
        <div className="reels-container mt-8">
          <div className="reels-header flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold">Reels</h3>
            <span className="see-all text-blue-500 cursor-pointer">See all</span>
          </div>
          <div className="reels-grid grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {reels.map(reel => (
              <div key={reel.id} className="reel-item bg-white rounded-lg shadow overflow-hidden">
                <div className="reel-video relative">
                  <img src={reel.videoUrl || 'https://picsum.photos/200x200'} alt={reel.title || "Reel"} className="w-full h-40 object-cover" />
                  <div className="reel-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="play-button text-white text-2xl">▶</div>
                  </div>
                </div>
                <div className="reel-info flex items-center p-2">
                  <img src={(reel as any).userAvatar || 'https://picsum.photos/24x24'} alt="Avatar" className="reel-avatar h-6 w-6 rounded-full mr-2" />
                  <span className="reel-username text-sm font-medium">{reel.userId || 'Anonymous'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
