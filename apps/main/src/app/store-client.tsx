'use client';

import { useState, useEffect } from 'react';
import { log } from "@repo/logger";
import { Link } from "@repo/ui/link";
import { CounterButton } from "@repo/ui/counter-button";
import { FeedItemResourceApi } from "@repo/api-client";
import { Configuration } from "@repo/api-client";
import type { FeedItemDTO } from "@repo/api-client";
import { config } from 'dotenv';

export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store() {
  log("Hey! This is the Feed page.");

  const [posts, setPosts] = useState<any[]>([]);
  const [reels, setReels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});

  const config = new Configuration({
    basePath: 'http://localhost:8080/services/msfeed',
    // accessToken: "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJXeHBBeFg3MDVjUkxXOG5MWi1LWmNCX2ZFSlhBcnRxMDNKUW91Zk5uRTdvIn0.eyJleHAiOjE3NTA3MzQ0NTIsImlhdCI6MTc1MDczNDE1MiwianRpIjoiYWFjMzYzOTktOTY1Yi00ZjA4LTkwZTMtZWEwNzJkNjcyNzdiIiwiaXNzIjoiaHR0cHM6Ly9rZXljbG9hay5hcHBmNC5pby52bi9yZWFsbXMvamhpcHN0ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiNGM5NzM4OTYtNTc2MS00MWZjLTgyMTctMDdjNWQxM2EwMDRiIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoid2ViX2FwcCIsInNpZCI6IjVkYTE3MjU3LTVlNzEtNGZkNi1iY2Y5LWYxNDhjMTg1N2RkYyIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiIiwiaHR0cDovL2xvY2FsaG9zdDo4MDgwIiwiaHR0cHM6Ly9jb25zdWwuYXBwZjQuaW8udm4vKiIsImh0dHBzOi8vbXlzcWwuYXBwZjQuaW8udm4vKiIsIioiLCJodHRwczovL2thZmthLmFwcGY0LmlvLnZuLyoiLCJodHRwOi8vbG9jYWxob3N0OjMwMDAiLCJodHRwczovL3JlZGlzLmFwcGY0LmlvLnZuLyoiLCJodHRwOi8vbG9jYWxob3N0OjgxMDAiLCJodHRwczovL2thZmRyb3AuYXBwZjQuaW8udm4vKiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbIlJPTEVfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwiUk9MRV9BRE1JTiIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJlbWFpbCBwcm9maWxlIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInJvbGVzIjpbIlJPTEVfVVNFUiIsIm9mZmxpbmVfYWNjZXNzIiwiUk9MRV9BRE1JTiIsInVtYV9hdXRob3JpemF0aW9uIl0sIm5hbWUiOiJBZG1pbiBBZG1pbmlzdHJhdG9yIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJnaXZlbl9uYW1lIjoiQWRtaW4iLCJmYW1pbHlfbmFtZSI6IkFkbWluaXN0cmF0b3IiLCJlbWFpbCI6ImFkbWluQGxvY2FsaG9zdCJ9.lb8hUiBDeUcG9gcVTre6XS9T7zZcWqKx1a8yKWm1VProRQPA_CgzGmrixh-41X4PdDOvv2yxQ0QVXXSOsS132CtZy2Ax7CKoHTOQw8zNf5F2dko4xlUUusDOSe8RrVHKXcgLj3-hKw4YQxR4QQrh3p9FzzsmxmfYfWqHtzDgxC-PAxmsGWRcAnGRVuahJxmqtWzlDGvmu1l6Tm3yevGyscBB9qSNt8fSmMs_OQN2ZZUVoRSlGWlSWloWUBOFLNscXx1DI4xhjwd-3zZBzwMVReQPWbOoUGqvx58EaXuuI82M_OgqQKFcV0mIWvzeFy_Fd2C2upUJ6h2FcCv0-F0YkA",

    baseOptions: {
      headers: {
        // You can add additional headers here if needed
      },
    },
  });
  const feedApi = new FeedItemResourceApi(config);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch feed items
        const feedResponse = await feedApi.getAllFeedItems(0, 10);
        const feedItems = feedResponse.data || [];

        // Transform feed items to match existing post structure
        const transformedPosts = feedItems.map((item: FeedItemDTO, index: number) => ({
          id: item.id || index + 1,
          author: item.userId || 'Unknown User',
          avatar: item.userId || `https://randomuser.me/api/portraits/men/${index + 1}.jpg`,
          time: item.timestamp ? new Date(item.timestamp).toLocaleString() : '1h',
          content: item.userId || '',
          image: item.userId,
          likes: item.userId || 0,
          comments: item.userId || 0,
          shares: item.userId || 0,
          commentsList: []
        }));

        // Set hardcoded reels for now since ReelResourceApi is not available
        const hardcodedReels = [
          {
            id: 1,
            videoUrl: 'https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif',
            username: '@funnycats',
            avatar: 'https://via.placeholder.com/24',
            title: 'Funny Cat Video',
            description: 'Hilarious cat moments'
          },
          {
            id: 2,
            videoUrl: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
            username: '@dancingdogs',
            avatar: 'https://via.placeholder.com/24',
            title: 'Dancing Dogs',
            description: 'Dogs having fun'
          },
          {
            id: 3,
            videoUrl: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
            username: '@foodie_life',
            avatar: 'https://via.placeholder.com/24',
            title: 'Cooking Tips',
            description: 'Amazing recipes'
          },
          {
            id: 4,
            videoUrl: 'https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif',
            username: '@travel_vibes',
            avatar: 'https://via.placeholder.com/24',
            title: 'Travel Adventures',
            description: 'Beautiful destinations'
          }
        ];

        setPosts(transformedPosts);
        setReels(hardcodedReels);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to original hardcoded data if API fails
        setPosts([
          {
            id: 1,
            author: 'John Doe',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            time: '2h',
            content: 'Just had an amazing day at the beach! 🏖️ The weather was perfect and the sunset was incredible.',
            image: 'https://via.placeholder.com/500x300',
            likes: 24,
            comments: 8,
            shares: 3,
            commentsList: [
              { id: 1, author: 'Sarah Wilson', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', content: 'Looks amazing! Which beach was this?', time: '1h' },
              { id: 2, author: 'Tom Brown', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', content: 'Beautiful sunset! 🌅', time: '45m' }
            ]
          }
        ]);
        setReels([
          {
            id: 1,
            videoUrl: 'https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif',
            username: '@funnycats',
            avatar: 'https://via.placeholder.com/24'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const [postIdBeingEdited, setPostIdBeingEdited] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>('');

  const handleEditPost = (postId: number, currentContent: string) => {
    setPostIdBeingEdited(postId);
    setEditedContent(currentContent);
  };

  const handleUpdatePost = async (postId: number) => {
    if (!editedContent.trim()) return;

    try {
      // In a real implementation, you would call an API to update the post
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? { ...post, content: editedContent.trim() }
            : post
        )
      );
      setPostIdBeingEdited(null);
      setEditedContent('');
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const toggleComments = (postId: number) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = async (postId: number) => {
    const commentText = newComment[postId];
    if (!commentText || !commentText.trim()) return;

    try {
      // In a real implementation, you would call an API to add the comment
      // For now, we'll just update the local state
      setPosts(prevPosts =>
        prevPosts.map(post =>
          post.id === postId
            ? {
              ...post,
              commentsList: [
                ...post.commentsList,
                {
                  id: post.commentsList.length + 1,
                  author: 'You',
                  avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
                  content: commentText.trim(),
                  time: 'now'
                }
              ],
              comments: post.comments + 1
            }
            : post
        )
      );

      setNewComment(prev => ({ ...prev, [postId]: '' }));
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleCommentChange = (postId: number, value: string) => {
    setNewComment(prev => ({ ...prev, [postId]: value }));
  };

  if (loading) {
    return (
      <div className="fb-container">
        <div className="loading-spinner" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          fontSize: '18px'
        }}>
          Loading feed...
        </div>
      </div>
    );
  }

  return (
    <div className="fb-container">
      {/* Facebook-like Header */}
      <header className="fb-header">
        <div className="header-left">
          <div className="logo">AppF4</div>
          <div className="search-bar">
            <input type="text" placeholder="Search AppF4" />
          </div>
        </div>
        <div className="header-center">
          <div className="nav-icons">
            <div className="nav-icon active">🏠</div>
            <div className="nav-icon">👥</div>
            <div className="nav-icon">📺</div>
            <div className="nav-icon">🛍️</div>
            <div className="nav-icon">🎮</div>
          </div>
        </div>
        <div className="header-right">
          <div className="profile-menu">
            <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Profile" className="header-avatar" />
            <span>You</span>
          </div>
        </div>
      </header>

      <div className="fb-main">
        {/* Left Sidebar */}
        <aside className="left-sidebar">
          <div className="sidebar-item">
            <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Profile" />
            <span>Your Profile</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">👥</span>
            <span>Friends</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">⏰</span>
            <span>Memories</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">💾</span>
            <span>Saved</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">👥</span>
            <span>Groups</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">📺</span>
            <span>Video</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">🛍️</span>
            <span>Marketplace</span>
          </div>
          <div className="sidebar-item">
            <span className="sidebar-icon">🎮</span>
            <span>Gaming</span>
          </div>
        </aside>

        {/* Main Feed */}
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

          {/* Create Post */}
          <div className="create-post">
            <div className="create-post-top">
              <img src="https://randomuser.me/api/portraits/women/9.jpg" alt="Your avatar" />
              <input type="text" placeholder="What's on your mind?" />
            </div>
            <div className="create-post-buttons">
              <button className="post-option">
                <span>📹</span> Live Video
              </button>
              <button className="post-option">
                <span>📸</span> Photo/Video
              </button>
              <button className="post-option">
                <span>😊</span> Feeling/Activity
              </button>
            </div>
          </div>

          {/* Posts Feed - Now using API data */}
          <div className="posts-feed">
            {posts.map(post => (
              <div key={post.id} className="post">
                <div className="post-header">
                  <img src={post.avatar} alt={post.author} className="post-avatar" />
                  <div className="post-info">
                    <h3>{post.author}</h3>
                    <span className="post-time">{post.time}</span>
                  </div>
                  <div className="post-options">⋯</div>
                </div>
                <div className="post-content">
                  <p>{post.content}</p>
                  {post.image && (
                    <img src={post.image} alt="Post content" className="post-image" />
                  )}
                </div>
                <div className="post-stats">
                  <span>👍 {post.likes}</span>
                  <span>{post.comments} comments • {post.shares} shares</span>
                </div>
                <div className="post-actions">
                  <button className="action-btn">
                    <span>👍</span> Like
                  </button>
                  <button className="action-btn" onClick={() => toggleComments(post.id)}>
                    <span>💬</span> Comment
                  </button>
                  <button className="action-btn">
                    <span>📤</span> Share
                  </button>
                </div>

                {/* Comments Section */}
                {showComments[post.id] && (
                  <div className="comments-section">
                    <div className="comments-list">
                      {post.commentsList.map((comment: any) => (
                        <div key={comment.id} className="comment-item">
                          <img src={comment.avatar} alt={comment.author} className="comment-avatar" />
                          <div className="comment-content">
                            <div className="comment-bubble">
                              <div className="comment-author">{comment.author}</div>
                              <div className="comment-text">{comment.content}</div>
                            </div>
                            <div className="comment-actions">
                              <span className="comment-time">{comment.time}</span>
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
                          value={newComment[post.id] || ''}
                          onChange={(e) => handleCommentChange(post.id, e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                          className="comment-input"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="comment-submit"
                          disabled={!newComment[post.id]?.trim()}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Reels Section - Now using API data */}
          <div className="reels-container">
            <div className="reels-header">
              <h3>Reels</h3>
              <span className="see-all">See all</span>
            </div>
            <div className="reels-grid">
              {reels.map(reel => (
                <div key={reel.id} className="reel-item">
                  <div className="reel-video">
                    <img src={reel.thumbnailUrl || reel.videoUrl} alt={reel.title || "Reel"} />
                    <div className="reel-overlay">
                      <div className="play-button">▶</div>
                    </div>
                  </div>
                  <div className="reel-info">
                    <img src={reel.avatar} alt="Avatar" className="reel-avatar" />
                    <span className="reel-username">{reel.username}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="right-sidebar">
          <div className="sidebar-section">
            <h3>Sponsored</h3>
            <div className="sponsored-item">
              <img src="https://via.placeholder.com/80x80" alt="Ad" />
              <div>
                <h4>Amazing Product</h4>
                <p>Check out this amazing deal!</p>
              </div>
            </div>
          </div>

          <div className="sidebar-section">
            <h3>Contacts</h3>
            <div className="contact-item">
              <img src="https://randomuser.me/api/portraits/women/10.jpg" alt="Contact" />
              <span>Alice Johnson</span>
              <div className="online-status"></div>
            </div>
            <div className="contact-item">
              <img src="https://randomuser.me/api/portraits/men/11.jpg" alt="Contact" />
              <span>Bob Wilson</span>
              <div className="online-status"></div>
            </div>
            <div className="contact-item">
              <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="Contact" />
              <span>Carol Brown</span>
            </div>
            <div className="contact-item">
              <img src="https://randomuser.me/api/portraits/men/13.jpg" alt="Contact" />
              <span>David Lee</span>
              <div className="online-status"></div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
