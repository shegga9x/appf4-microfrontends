'use client';

import { useState, useEffect } from 'react';
import { log } from "@repo/logger";
import { Link } from "@repo/ui/link";
import { CounterButton } from "@repo/ui/counter-button";
export const metadata = {
  title: "Store | Kitchen Sink",
};

export default function Store() {
  log("Hey! This is the Post page.");

  const [posts, setPosts] = useState([
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
    },
    {
      id: 2,
      author: 'Jane Smith',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      time: '4h',
      content: 'Working on some exciting new projects! Can\'t wait to share more details soon. #coding #webdev',
      likes: 15,
      comments: 4,
      shares: 1,
      commentsList: [
        { id: 1, author: 'Alex Johnson', avatar: 'https://randomuser.me/api/portraits/men/5.jpg', content: 'Can\'t wait to see what you\'re building!', time: '2h' }
      ]
    },
    {
      id: 3,
      author: 'Mike Johnson',
      avatar: 'https://randomuser.me/api/portraits/men/6.jpg',
      time: '6h',
      content: 'Great coffee and even better company this morning ☕',
      image: 'https://via.placeholder.com/500x200',
      likes: 32,
      comments: 12,
      shares: 5,
      commentsList: [
        { id: 1, author: 'Emma Davis', avatar: 'https://randomuser.me/api/portraits/women/7.jpg', content: 'That looks like the perfect morning!', time: '4h' },
        { id: 2, author: 'Chris Lee', avatar: 'https://randomuser.me/api/portraits/men/8.jpg', content: 'Great choice of cafe! ☕', time: '3h' }
      ]
    }
  ]);

  const [showComments, setShowComments] = useState<Record<number, boolean>>({});
  const [newComment, setNewComment] = useState<Record<number, string>>({});

  const toggleComments = (postId: number) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId: number) => {
    const commentText = newComment[postId];
    if (!commentText || !commentText.trim()) return;

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
  };

  const handleCommentChange = (postId: number, value: string) => {
    setNewComment(prev => ({ ...prev, [postId]: value }));
  };

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

          {/* Posts Feed */}
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
                      {post.commentsList.map(comment => (
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

          {/* Reels Section */}
          <div className="reels-container">
            <div className="reels-header">
              <h3>Reels</h3>
              <span className="see-all">See all</span>
            </div>
            <div className="reels-grid">
              <div className="reel-item">
                <div className="reel-video">
                  <img src="https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif" alt="Funny cat" />
                  <div className="reel-overlay">
                    <div className="play-button">▶</div>
                  </div>
                </div>
                <div className="reel-info">
                  <img src="https://via.placeholder.com/24" alt="Avatar" className="reel-avatar" />
                  <span className="reel-username">@funnycats</span>
                </div>
              </div>

              <div className="reel-item">
                <div className="reel-video">
                  <img src="https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif" alt="Dog dancing" />
                  <div className="reel-overlay">
                    <div className="play-button">▶</div>
                  </div>
                </div>
                <div className="reel-info">
                  <img src="https://via.placeholder.com/24" alt="Avatar" className="reel-avatar" />
                  <span className="reel-username">@dancingdogs</span>
                </div>
              </div>

              <div className="reel-item">
                <div className="reel-video">
                  <img src="https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif" alt="Cooking" />
                  <div className="reel-overlay">
                    <div className="play-button">▶</div>
                  </div>
                </div>
                <div className="reel-info">
                  <img src="https://via.placeholder.com/24" alt="Avatar" className="reel-avatar" />
                  <span className="reel-username">@foodie_life</span>
                </div>
              </div>

              <div className="reel-item">
                <div className="reel-video">
                  <img src="https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif" alt="Travel" />
                  <div className="reel-overlay">
                    <div className="play-button">▶</div>
                  </div>
                </div>
                <div className="reel-info">
                  <img src="https://via.placeholder.com/24" alt="Avatar" className="reel-avatar" />
                  <span className="reel-username">@travel_vibes</span>
                </div>
              </div>
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
