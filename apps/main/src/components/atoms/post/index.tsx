import moment from 'moment';
import React, { useState } from 'react';
import type { FeedWithOtherDTO, CommentWithRedisUserDTO } from '@repo/api-client';
import { LoadingSpinner } from '@repo/ui';

interface IProps {
  post: FeedWithOtherDTO;
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

const Post: React.FC<IProps> = (props) => {
  const {
    post,
    showComments = {},
    newComment = {},
    loadingComments = {},
    submittingComment = {},
    likedFeeds = {},
    likingFeed = {},
    toggleComments,
    handleAddComment,
    handleCommentChange,
    handleToggleLike
  } = props;
  const user = post.redisUserDTO;
  const feedItem = post.feedItem;
  const feedId = feedItem?.id ? String(feedItem.id) : '';
  const isLiked = likedFeeds[feedId] || false;
  const isLiking = likingFeed[feedId] || false;
  const isLoadingComments = loadingComments[feedId] || false;
  const isSubmittingComment = submittingComment[feedId] || false;
  const [imgLoading, setImgLoading] = useState(true);
  // Use a map to track loading state for each comment/add-comment image
  const [imgLoadingMap, setImgLoadingMap] = useState<Record<string, boolean>>({});

  // Helper to get a stable seed for comment images
  const getCommentImgSeed = (comment: CommentWithRedisUserDTO) =>
    comment?.redisUserDTO?.id || comment?.commentDTO?.id || 'default';

  // Helper to handle image loading state for any image (by key)
  const handleImgLoad = (key: string) => {
    setImgLoadingMap((prev) => ({ ...prev, [key]: false }));
  };

  return (
    <div className="h-auto w-full rounded-md bg-white shadow dark:bg-neutral-800">
      <div className="flex items-center space-x-2 p-2.5 px-4">
        <div className="h-10 w-10">
          <a href={`/post/profile?id=${user?.id || ''}`}>
            <img
              src={`https://picsum.photos/seed/${feedId || Math.random()}/100/100`}
              className="h-full w-full rounded-full object-cover"
              alt={user?.username || 'User'}
            />
          </a>
        </div>
        <div className="flex flex-grow flex-col">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            <a href={`/post/profile?id=${user?.id || ''}`}>
              {user?.username || 'Anonymous'}
            </a>
          </p>
          <span className="text-xs font-thin text-gray-400">
            {feedItem?.createdAt ? moment(feedItem.createdAt).fromNow() : ''}
          </span>
        </div>
        <div className="h-8 w-8">
          <button className="h-full w-full rounded-full text-gray-400 hover:bg-gray-100 focus:outline-none dark:text-gray-500 dark:hover:bg-neutral-700 cursor-pointer">
            <i className="fas fa-ellipsis-h"></i>
          </button>
        </div>
      </div>
      {feedItem?.content ? (
        <div className="mb-1">
          <p className="max-h-10 truncate px-3 text-sm text-gray-700 dark:text-gray-300">
            {feedItem.content}
          </p>
        </div>
      ) : null}
      <div className="h-76 max-h-100 w-full relative">
        {imgLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-neutral-800/60 z-10">
            <LoadingSpinner size="large" />
          </div>
        )}
        <img
          src={`https://picsum.photos/seed/${feedId || Math.random()}/800/600`}
          alt="postImage"
          className={`h-76 max-h-100 w-full object-cover transition-opacity duration-300 ${imgLoading ? 'opacity-0' : 'opacity-100'}`}
          onLoad={() => setImgLoading(false)}
        />
      </div>
      <div className="flex w-full flex-col space-y-2 p-2 px-4">
        <div className="flex items-center justify-between border-b border-gray-300 pb-2 text-sm dark:border-neutral-700">
          <div className="flex items-center">
            <div className="flex items-center">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white focus:outline-none">
                <i style={{ fontSize: 10 }} className="fas fa-heart"></i>
              </span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-white focus:outline-none">
                <i style={{ fontSize: 10 }} className="fas fa-thumbs-up"></i>
              </span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-yellow-500 text-white focus:outline-none">
                <i style={{ fontSize: 10 }} className="fas fa-surprise"></i>
              </span>
              <div className="ml-1">
                <p className="text-gray-500 dark:text-gray-300">{post.likeCount || 0}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              className="text-gray-500 dark:text-gray-300 hover:cursor-pointer"
              onClick={toggleComments ? () => toggleComments(feedId) : undefined}
            >
              {post.commentCount || 0} Comments
            </button>
            <button
              className="text-gray-500 dark:text-gray-300 hover:cursor-pointer"
            >
              {post.shareCount || 0} Shares
            </button>
          </div>
        </div>
        <div className="flex space-x-3 text-sm font-thin text-gray-500">
          <div className="relative group flex-1 mr-2">
            {/* Reactions Hover Menu */}
  

            {/* Add the like button here */}
            <button
              className={`flex h-8 w-full items-center justify-center space-x-2 rounded-md transition-colors duration-150 
                hover:bg-blue-100 active:scale-95 focus:bg-blue-200 focus:outline-none 
                dark:text-gray-300 dark:hover:bg-blue-900 dark:focus:bg-blue-900
                ${isLiked ? 'text-blue-500 bg-blue-50 dark:bg-blue-900' : ''} cursor-pointer`}
              onClick={handleToggleLike ? () => handleToggleLike(feedId) : undefined}
              disabled={isLiking}
            >
              <div>
                <i className="fas fa-thumbs-up"></i>
              </div>
              <div>
                <p className="font-semibold">{isLiked ? 'Liked' : 'Like'}</p>
              </div>
            </button>
          </div>
          <button
            className="flex h-8 flex-1 items-center justify-center space-x-2 rounded-md transition-colors duration-150 
              hover:bg-gray-100 active:scale-95 focus:bg-gray-200 focus:outline-none 
              dark:text-gray-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 cursor-pointer"
            onClick={toggleComments ? () => toggleComments(feedId) : undefined}
          >
            <div>
              <i className="fas fa-comment"></i>
            </div>
            <div>
              <p className="font-semibold">Comment</p>
            </div>
          </button>
          <button
            className="flex h-8 flex-1 items-center justify-center space-x-2 rounded-md transition-colors duration-150 
              hover:bg-gray-100 active:scale-95 focus:bg-gray-200 focus:outline-none 
              dark:text-gray-300 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 cursor-pointer"
          >
            <div>
              <i className="fas fa-share"></i>
            </div>
            <div>
              <p className="font-semibold">Share</p>
            </div>
          </button>
        </div>
        {/* Comments Section */}
        {showComments[feedId] && (
          <div className="comments-section mt-2">
            {isLoadingComments ? (
              <div className="comments-loading text-center text-gray-400 py-4">Loading comments...</div>
            ) : (
              <>
                <div className="comments-list space-y-2">
                  {((feedItem as any)?.comments || []).map((comment: CommentWithRedisUserDTO) => {
                    const commentSeed = getCommentImgSeed(comment);
                    const commentImgKey = `comment-${commentSeed}`;
                    const isCommentImgLoading = imgLoadingMap[commentImgKey] !== false;
                    return (
                      <div key={comment.commentDTO?.id} className="flex items-start space-x-2">
                        <div className="relative h-8 w-8">
                          {isCommentImgLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-neutral-800/60 z-10">
                              <LoadingSpinner size="small" />
                            </div>
                          )}
                          <a href={`/post/profile?id=${comment?.redisUserDTO?.id || ''}`}>
                            <img
                              src={`https://picsum.photos/seed/${commentSeed}/32/32`}
                              alt={comment.redisUserDTO?.username || 'User'}
                              className={`h-8 w-8 rounded-full object-cover transition-opacity duration-300 ${isCommentImgLoading ? 'opacity-0' : 'opacity-100'}`}
                              onLoad={() => handleImgLoad(commentImgKey)}
                            />
                          </a>
                        </div>
                        <div>
                          <div className="rounded bg-gray-100 px-2 py-1 dark:bg-neutral-700">
                            <span className="font-semibold">
                              <a href={`/post/profile?id=${comment?.redisUserDTO?.id || ''}`}>
                                {comment.redisUserDTO?.username || 'Anonymous'}
                              </a>
                            </span>
                            <span className="ml-2">{comment.commentDTO?.content || ''}</span>
                          </div>
                          <div className="text-xs text-gray-400">
                            {comment.commentDTO?.updatedAt ? moment(comment.commentDTO.updatedAt).fromNow() : ''}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="add-comment flex items-center mt-2 space-x-2">
                  <div className="relative h-8 w-8">
                    {imgLoadingMap['add-comment'] !== false && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-neutral-800/60 z-10">
                        <LoadingSpinner size="small" />
                      </div>
                    )}
                    <img
                      src={`https://picsum.photos/seed/${feedId || Math.random()}/200/200`}
                      alt="Your avatar"
                      className={`h-8 w-8 rounded-full object-cover transition-opacity duration-300 ${imgLoadingMap['add-comment'] !== false ? 'opacity-0' : 'opacity-100'}`}
                      onLoad={() => handleImgLoad('add-comment')}
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={newComment[feedId] || ''}
                    onChange={handleCommentChange ? (e) => handleCommentChange(feedId, e.target.value) : undefined}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey && handleAddComment && !isSubmittingComment) {
                        e.preventDefault();
                        handleAddComment(feedId);
                      }
                    }}
                    className="flex-1 rounded-full bg-gray-100 px-3 py-1 text-sm focus:outline-none dark:bg-neutral-700"
                    disabled={isSubmittingComment}
                  />
                  <button
                    onClick={handleAddComment ? () => handleAddComment(feedId) : undefined}
                    className="rounded-full bg-blue-500 px-3 py-1 text-white disabled:opacity-50 cursor-pointer"
                    disabled={!newComment[feedId]?.trim() || isSubmittingComment}
                  >
                    {isSubmittingComment ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div >
  );
};

export default Post;
