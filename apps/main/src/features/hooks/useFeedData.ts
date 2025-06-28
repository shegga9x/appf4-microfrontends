import { useState, useEffect } from 'react';
import { fetchFeedItems, updateFeedContent, showComment, addNewComment, toggleLike, checkIfLiked, getCurrentUserId } from '../feed/feedService';
import { getHardcodedReels, getFallbackReels } from '../reels/reelsService';
import { getFallbackFeeds } from '../feed/feedService';
import type {
    FeedWithOtherDTO,
    ReelDTO
} from "@repo/api-client";

export const useFeedData = () => {
    const [feeds, setFeeds] = useState<FeedWithOtherDTO[]>([]);
    const [reels, setReels] = useState<ReelDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [showComments, setShowComments] = useState<Record<string, boolean>>({});
    const [newComment, setNewComment] = useState<Record<string, string>>({});
    const [feedIdBeingEdited, setFeedIdBeingEdited] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState<string>('');
    const [loadingComments, setLoadingComments] = useState<Record<string, boolean>>({});
    const [submittingComment, setSubmittingComment] = useState<Record<string, boolean>>({});
    const [likedFeeds, setLikedFeeds] = useState<Record<string, boolean>>({});
    const [likingFeed, setLikingFeed] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const loadFeeds = async () => {
            setLoading(true);
            try {
                const feedItems = await fetchFeedItems();
                setFeeds(feedItems);
                
                // Initialize like states for current user
                const userId = getCurrentUserId();
                console.log('Loading feeds for user:', userId);
                
                if (userId && userId !== 'anonymous-user') {
                    const likeStates: Record<string, boolean> = {};
                    
                    // Check like status for each feed
                    for (const feed of feedItems) {
                        const feedId = String(feed.feedItem?.id);
                        try {
                            const isLiked = await checkIfLiked(feedId);
                            likeStates[feedId] = isLiked;
                            console.log(`Feed ${feedId} liked status:`, isLiked);
                        } catch (error) {
                            console.error(`Error checking like status for feed ${feedId}:`, error);
                            likeStates[feedId] = false;
                        }
                    }
                    
                    setLikedFeeds(likeStates);
                    console.log('Loaded like states:', likeStates);
                } else {
                    console.log('No user logged in, skipping like status check');
                }
                
                // Load reels
                const reelItems = await getHardcodedReels();
                setReels(reelItems);
            } catch (error) {
                console.error('Error loading feeds:', error);
                setFeeds(getFallbackFeeds());
                setReels(getFallbackReels());
            } finally {
                setLoading(false);
            }
        };

        loadFeeds();
    }, []); // Remove getUserId dependency since we're using sharedCookies directly

    const handleEditFeed = (feedId: string, currentContent: string) => {
        setFeedIdBeingEdited(feedId);
        setEditedContent(currentContent);
    };

    const handleUpdateFeed = async (feedId: string) => {
        if (!editedContent.trim()) return;

        try {
            setFeeds(prevFeeds => updateFeedContent(prevFeeds, feedId, editedContent));
            setFeedIdBeingEdited(null);
            setEditedContent('');
        } catch (error) {
            console.error('Error updating feed:', error);
        }
    };

    const toggleComments = async (feedId: string) => {
        const isCurrentlyShowing = showComments[feedId];
        
        setShowComments(prev => ({
            ...prev,
            [feedId]: !prev[feedId]
        }));

        // If we're showing comments (toggling from hidden to visible), fetch them
        if (!isCurrentlyShowing) {
            try {
                setLoadingComments(prev => ({ ...prev, [feedId]: true }));
                
                const updatedFeeds = await showComment(feeds, feedId, '');
                setFeeds(updatedFeeds);
            } catch (error) {
                console.error('Error fetching comments:', error);
            } finally {
                setLoadingComments(prev => ({ ...prev, [feedId]: false }));
            }
        }
    };

    const handleCommentChange = (feedId: string, value: string) => {
        setNewComment(prev => ({ ...prev, [feedId]: value }));
    };

    const handleToggleLike = async (feedId: string) => {
        const currentUserId = getCurrentUserId();
        
        // Prevent likes for anonymous users
        if (currentUserId === 'anonymous-user') {
            console.warn('Cannot like feed: user not logged in');
            return;
        }
        
        const isCurrentlyLiked = likedFeeds[feedId] || false;
        
        try {
            setLikingFeed(prev => ({ ...prev, [feedId]: true }));
            
            // Optimistically update UI
            setLikedFeeds(prev => ({ ...prev, [feedId]: !isCurrentlyLiked }));
            
            // Update feeds with new like count
            const updatedFeeds = await toggleLike(feeds, feedId, isCurrentlyLiked);
            setFeeds(updatedFeeds);
            
            console.log('Like toggled successfully for user:', currentUserId);
        } catch (error) {
            console.error('Error toggling like:', error);
            // Revert optimistic update on error
            setLikedFeeds(prev => ({ ...prev, [feedId]: isCurrentlyLiked }));
        } finally {
            setLikingFeed(prev => ({ ...prev, [feedId]: false }));
        }
    };

    const handleAddComment = async (feedId: string) => {
        const commentText = newComment[feedId];
        if (!commentText || !commentText.trim()) return;

        const currentUserId = getCurrentUserId();
        
        // Prevent comments for anonymous users
        if (currentUserId === 'anonymous-user') {
            console.warn('Cannot add comment: user not logged in');
            return;
        }

        try {
            setSubmittingComment(prev => ({ ...prev, [feedId]: true }));
            
            // Add new comment and refresh the comments
            const updatedFeeds = await addNewComment(feeds, feedId, commentText);
            setFeeds(updatedFeeds);
            
            // Clear the input after successful submission
            setNewComment(prev => ({ ...prev, [feedId]: '' }));
            
            console.log('Comment added successfully by user:', currentUserId);
        } catch (error) {
            console.error('Error adding comment:', error);
            // Could add error state here for user feedback
        } finally {
            setSubmittingComment(prev => ({ ...prev, [feedId]: false }));
        }
    };

    return {
        feeds,
        reels,
        loading,
        showComments,
        newComment,
        feedIdBeingEdited,
        editedContent,
        loadingComments,
        submittingComment,
        likedFeeds,
        likingFeed,
        userId: getCurrentUserId(), // Use sharedCookies user ID
        setEditedContent,
        handleEditFeed,
        handleUpdateFeed,
        toggleComments,
        handleAddComment,
        handleCommentChange,
        handleToggleLike
    };
};
