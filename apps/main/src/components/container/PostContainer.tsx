import React from 'react';
import { cn } from '../../utils';
import Post from '../atoms/post';
import type { FeedWithOtherDTO } from '@repo/api-client';

interface IProps {
  feeds?: FeedWithOtherDTO[];
  postsView?: 'gridView' | 'listView';
  showComments?: Record<string, boolean>;
  newComment?: Record<string, string>;
  loadingComments?: Record<string, boolean>;
  submittingComment?: Record<string, boolean>;
  likedFeeds?: Record<string, boolean>;
  likingFeed?: Record<string, boolean>;
  toggleComments?: (feedId: string) => void;
  handleAddComment?: (feedId: string) => void;
  handleCommentChange?: (feedId: string, value: string) => void;
  handleToggleLike?: (feedId: string) => void;
}

const PostContainer: React.FC<IProps> = (props) => {
  const {
    postsView,
    feeds,
    showComments,
    newComment,
    loadingComments,
    submittingComment,
    likedFeeds,
    likingFeed,
    toggleComments,
    handleAddComment,
    handleCommentChange,
    handleToggleLike,
  } = props;
  const items = feeds && feeds.length ? feeds : [];

  return (
    <div className="mt-4 h-full w-full">
      <div
        className={cn(
          'grid gap-2',
          postsView === 'gridView' ? 'grid-cols-2' : 'grid-cols-1',
        )}
      >
        {items.length ? (
          items.map((item, idx) => (
            <Post
              key={idx}
              post={item}
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
          ))
        ) : (
          <p>No posts yet!</p>
        )}
      </div>
    </div>
  );
};

export default PostContainer;
