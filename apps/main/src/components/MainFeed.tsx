import type {
  ReelDTO,
  LikeDTO,
  UserDTO,
  FeedWithOtherDTO,
  CommentWithRedisUserDTO
} from "@repo/api-client";
import Header from './Header';
import LoadingSpinner from './LoadingSpinner';

interface MainFeedProps {
  feeds: FeedWithOtherDTO[];
  reels: ReelDTO[];
  showComments: Record<string, boolean>;
  newComment: Record<string, string>;
  loadingComments: Record<string, boolean>;
  toggleComments: (feedId: string) => void;
  handleCommentChange: (feedId: string, value: string) => void;
}

export default function MainFeed({
  feeds,
  reels,
  showComments,
  newComment,
  loadingComments,
  toggleComments,
  handleCommentChange
}: MainFeedProps) {
  return (
    <div className="app-container">
      <Header />
      
      <main className="main-feed">
        {/* Story Section */}
        <div className="stories-container">
          <div className="story create-story">
            <div className="story-image">
              <div className="add-story-icon">+</div>
            </div>
            <span>Create Story</span>
          </div>
          <div className="story">
            <div className="story-image">
              <img src="https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif" alt="John's story" className="story-gif" />
              <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Avatar" className="story-avatar" />
            </div>
            <span>John</span>
          </div>
          <div className="story">
            <div className="story-image">
              <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="Sarah's story" className="story-gif" />
              <img src="https://randomuser.me/api/portraits/women/2.jpg" alt="Avatar" className="story-avatar" />
            </div>
            <span>Sarah</span>
          </div>
          <div className="story">
            <div className="story-image">
              <img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" alt="Mike's story" className="story-gif" />
              <img src="https://randomuser.me/api/portraits/men/6.jpg" alt="Avatar" className="story-avatar" />
            </div>
            <span>Mike</span>
          </div>
          <div className="story">
            <div className="story-image">
              <img src="https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif" alt="Emma's story" className="story-gif" />
              <img src="https://randomuser.me/api/portraits/women/7.jpg" alt="Avatar" className="story-avatar" />
            </div>
            <span>Emma</span>
          </div>
        </div>

        {/* Create feed */}
        <div className="create-feed">
          <div className="create-feed-top">
            <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Your avatar" />
            <input type="text" placeholder="What's on your mind?" />
          </div>
          <div className="create-feed-buttons">
            <button className="feed-option">
              <span>📹</span> Live Video
            </button>
            <button className="feed-option">
              <span>📸</span> Photo/Video
            </button>
            <button className="feed-option">
              <span>😊</span> Feeling/Activity
            </button>
          </div>
        </div>

        {/* feeds Feed - Using FeedWithOtherDTO */}
        <div className="feeds-feed">
          {feeds.map(feed => {
            // Create safe extended feed object with defaults
            const safeComments = (feed as any).feedItem?.comments || [];
            const safeLikesCount = feed.likeCount || 0;
            const safeCommentsCount = feed.commentCount || 0;
            const safeSharesCount = feed.shareCount || 0;
            const feedId = String(feed.feedItem?.id);
            const isLoadingComments = loadingComments[feedId];

            return (
              <div key={feed.feedItem?.id} className="feed">
                <div className="feed-header">
                  <img src={feed.userAvatar || 'https://via.placeholder.com/40'} alt={feed.userName || 'User'} className="feed-avatar" />
                  <div className="feed-info">
                    <h3>{feed.userName || 'Anonymous User'}</h3>
                    <span className="feed-time">
                      {feed.feedItem?.updatedAt ? new Date(feed.feedItem?.updatedAt).toLocaleString() : 'Just now'}
                    </span>
                  </div>
                  <div className="feed-options">⋯</div>
                </div>
                <div className="feed-content">
                  <p>{feed.feedItem?.content || 'No content available'}</p>
                  {feed.feedItem?.imageUrl && (
                    <img src={feed.feedItem?.imageUrl} alt="feed content" className="feed-image" />
                  )}
                  {feed.feedItem?.videoUrl && (
                    <video src={feed.feedItem?.videoUrl} controls className="feed-video" />
                  )}
                </div>
                <div className="feed-stats">
                  <span>👍 {safeLikesCount}</span>
                  <span>{safeCommentsCount} comments • {safeSharesCount} shares</span>
                </div>
                <div className="feed-actions">
                  <button className="action-btn">
                    <span>👍</span> Like
                  </button>
                  <button 
                    className="action-btn" 
                    onClick={() => toggleComments(feedId)}
                    disabled={isLoadingComments}
                  >
                    {isLoadingComments ? (
                      <>
                        <LoadingSpinner size="small" />
                        <span style={{ marginLeft: '4px' }}>Loading...</span>
                      </>
                    ) : (
                      <>
                        <span>💬</span> Comment
                      </>
                    )}
                  </button>
                  <button className="action-btn">
                    <span>📤</span> Share
                  </button>
                </div>

                {/* Comments Section */}
                {showComments[feedId] && (
                  <div className="comments-section">
                    {isLoadingComments ? (
                      <div className="comments-loading">
                        <LoadingSpinner size="medium" />
                        <span style={{ marginLeft: '8px' }}>Loading comments...</span>
                      </div>
                    ) : (
                      <>
                        <div className="comments-list">
                          {safeComments.map((comment: CommentWithRedisUserDTO) => (
                            <div key={comment.commentDTO?.id} className="comment-item">
                              <img src={comment.redisUserDTO?.userAvatar || 'https://via.placeholder.com/32'} alt={comment.redisUserDTO?.username || 'User'} className="comment-avatar" />
                              <div className="comment-content">
                                <div className="comment-bubble">
                                  <div className="comment-author">{comment.redisUserDTO?.username || 'Anonymous'}</div>
                                  <div className="comment-text">{comment.commentDTO?.content || 'No comment text'}</div>
                                </div>
                                <div className="comment-actions">
                                  <span className="comment-time">
                                    {comment.commentDTO?.updatedAt ? new Date(comment.commentDTO?.updatedAt).toLocaleString() : 'Just now'}
                                  </span>
                                  <button className="comment-action">Like</button>
                                  <button className="comment-action">Reply</button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="add-comment">
                          <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Your avatar" className="comment-avatar" />
                          <div className="comment-input-container">
                            <input
                              type="text"
                              placeholder="Write a comment..."
                              value={newComment[feedId] || ''}
                              onChange={(e) => handleCommentChange(feedId, e.target.value)}
                              className="comment-input"
                            />
                            <button
                              className="comment-submit"
                              disabled={!newComment[feedId]?.trim()}
                            >
                              Post
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Reels Section - Using ReelDTO */}
        <div className="reels-container">
          <div className="reels-header">
            <h3>Reels</h3>
            <span className="see-all">See all</span>
          </div>
          <div className="reels-grid">
            {reels.map(reel => (
              <div key={reel.id} className="reel-item">
                <div className="reel-video">
                  <img src={reel.videoUrl || 'https://via.placeholder.com/200'} alt={reel.title || "Reel"} />
                  <div className="reel-overlay">
                    <div className="play-button">▶</div>
                  </div>
                </div>
                <div className="reel-info">
                  <img src={(reel as any).userAvatar || 'https://via.placeholder.com/24'} alt="Avatar" className="reel-avatar" />
                  <span className="reel-username">{reel.userId || 'Anonymous'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <style jsx>{`
        .app-container {
          min-height: 100vh;
          background: #f0f2f5;
        }

        .main-feed {
          padding-top: 70px; /* Account for fixed header */
          max-width: 680px;
          margin: 0 auto;
          padding-left: 16px;
          padding-right: 16px;
        }

        .comments-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          color: #65676b;
          font-size: 14px;
        }

        .action-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }

        @media (max-width: 768px) {
          .main-feed {
            padding-top: 60px;
            padding-left: 8px;
            padding-right: 8px;
          }
        }
      `}</style>
    </div>
  );
}