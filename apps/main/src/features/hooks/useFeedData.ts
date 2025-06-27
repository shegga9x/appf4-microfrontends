import { useState, useEffect } from 'react';
import { fetchFeedItems, updateFeedContent ,showComment} from '../feed/feedService';
import { getHardcodedReels, getFallbackReels } from '../reels/reelsService';
import type {
    FeedItemDTO,
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

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const feedItems = await fetchFeedItems();
                const reelItems = getHardcodedReels();

                setFeeds(feedItems);
                setReels(reelItems);
            } catch (error) {
                console.error('Error fetching data:', error);
                setReels(getFallbackReels());
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

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
                const updatedFeeds = await showComment(feeds, feedId, '');
                setFeeds(updatedFeeds);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        }
    };

    const handleCommentChange = (feedId: string, value: string) => {
        setNewComment(prev => ({ ...prev, [feedId]: value }));
    };

    return {
        feeds,
        reels,
        loading,
        showComments,
        newComment,
        feedIdBeingEdited,
        editedContent,
        setEditedContent,
        handleEditFeed,
        handleUpdateFeed,
        toggleComments,
        handleCommentChange
    };
};
