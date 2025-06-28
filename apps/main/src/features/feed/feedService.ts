import type { FeedWithOtherDTO, CommentWithRedisUserDTO, CommentDTO, LikeDTO } from "@repo/api-client";
import { createFeedApi, createCommentApi, createLikeApi } from '../api/config';
import { generateUUID } from '@repo/next-scripts';
import { sharedCookies } from '@repo/shared-cookies';

// Get current user ID helper function
const getCurrentUserId = (): string => {
    const userId = sharedCookies.getUserId();
    return userId || 'anonymous-user';
};

// Generate a random UUID v4

export const showComment = async (feeds: FeedWithOtherDTO[], feedId: string, commentText: string): Promise<FeedWithOtherDTO[]> => {
    try {
        // Fetch updated comments for the specific feed
        const comments = await fetchCommentItems(feedId);

        return feeds.map(feed => {
            if (String(feed.feedItem?.id) === feedId) {
                console.log('Fetched comments:', feed);
                return {
                    ...feed,
                    feedItem: {
                        ...feed.feedItem!,
                        comments
                    },
                    commentCount: comments.length
                };
            }

            return feed;
        });
    } catch (error) {
        console.error('Error adding comment to feed:', error);
        return feeds;
    }
};

export const transformFeedItems = async (feedItems: FeedWithOtherDTO[]): Promise<FeedWithOtherDTO[]> => {
    const now = new Date().toISOString();

    const transformedFeeds = feedItems.map((item: FeedWithOtherDTO, index: number) => {
        const feedItem = item.feedItem;
        const feedId = feedItem?.id ?? String(index + 1);

        // Create transformed feed item without fetching comments
        const transformedFeedItem = {
            id: feedId,
            userId: feedItem?.userId ?? 'Unknown User',
            timestamp: feedItem?.createdAt ?? now,

            userAvatar: item.redisUserDTO?.userAvatar ?? `https://randomuser.me/api/portraits/men/${(index % 100) + 1}.jpg`,
            content: feedItem?.content ?? 'No content available',
            imageUrl: feedItem?.imageUrl ?? '',
            videoUrl: feedItem?.videoUrl ?? '',

            likesCount: item.likeCount ?? 0,
            commentsCount: item.commentCount ?? 0,
            sharesCount: item.shareCount ?? 0,

            tags: [],
            mentions: [],
            visibility: feedItem?.visibility ?? 'PUBLIC',
            location: feedItem?.location ?? '',

            createdAt: feedItem?.createdAt ?? now,
            updatedAt: feedItem?.updatedAt ?? now,

            likes: [],
            shares: [],
            comments: [], // Empty initially, will be loaded when needed
        };

        return {
            ...item,
            feedItem: transformedFeedItem,
            userName: item.redisUserDTO?.username ?? 'Unknown User',
            userAvatar: item.redisUserDTO?.userAvatar ?? `https://randomuser.me/api/portraits/men/${(index % 100) + 1}.jpg`,
            likeCount: item.likeCount ?? 0,
            commentCount: item.commentCount ?? 0,
            shareCount: item.shareCount ?? 0
        };
    });

    return transformedFeeds;
};

export const getFallbackFeeds = (): FeedWithOtherDTO[] => {
    const fallbackFeedItem = {
        id: '1',
        userId: 'John Doe',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        content: 'Just had an amazing day at the beach! 🏖️ The weather was perfect and the sunset was incredible.',
        imageUrl: 'https://via.placeholder.com/500x300',
        videoUrl: '',
        likesCount: 24,
        commentsCount: 2,
        sharesCount: 3,
        tags: ['beach', 'sunset'],
        mentions: [],
        visibility: 'PUBLIC' as const,
        location: 'Beach Resort',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        reelId: '',
        likes: [],
        shares: [],
        comments: [
            {
                id: '1',
                userId: 'Sarah Wilson',
                userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
                content: 'Looks amazing! Which beach was this?',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                parentType: 'FEED' as const,
                parentId: '1',
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                likesCount: 0,
                repliesCount: 0,
                mentions: [],
                tags: []
            },
            {
                id: '2',
                userId: 'Tom Brown',
                userAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
                content: 'Beautiful sunset! 🌅',
                timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
                parentType: 'FEED' as const,
                parentId: '1',
                createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
                updatedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
                likesCount: 0,
                repliesCount: 0,
                mentions: [],
                tags: []
            }
        ]
    };

    return [{
        feedItem: fallbackFeedItem,
        redisUserDTO: {
            id: '1',
            username: 'John Doe',
            userAvatar: 'https://randomuser'
        },
        likeCount: 24,
        commentCount: 2,
        shareCount: 3
    }];
};

export const fetchFeedItems = async (): Promise<FeedWithOtherDTO[]> => {
    try {
        const feedApi = createFeedApi();
        const feedResponse = await feedApi.findFeedWithOther("", 0, 10);
        const feedWithOtherItems = feedResponse.data || [];

        return transformFeedItems(feedWithOtherItems);
    } catch (error) {
        console.error('Error fetching feed items:', error);
        return getFallbackFeeds();
    }
};

export const fetchCommentItems = async (feedId: string): Promise<CommentWithRedisUserDTO[]> => {
    try {
        const commentApi = createCommentApi();
        const commentResponse = await commentApi.getCommentsByParent(feedId, "feed", 0, 10);

        return commentResponse.data || [];
    } catch (error) {
        console.error('Error fetching comments:', error);
        return [];
    }
};

export const updateFeedContent = (feeds: FeedWithOtherDTO[], feedId: string, newContent: string): FeedWithOtherDTO[] => {
    return feeds.map(feed => {
        if (String(feed.feedItem?.id) === feedId && feed.feedItem) {
            return {
                ...feed,
                feedItem: {
                    ...feed.feedItem,
                    content: newContent.trim()
                }
            };
        }
        return feed;
    });
};

export const addNewComment = async (feeds: FeedWithOtherDTO[], feedId: string, commentText: string): Promise<FeedWithOtherDTO[]> => {
    try {
        // Create new comment via API
        const commentData: CommentDTO = {
            content: commentText.trim(),
            parentType: 'feed',
            parentId: feedId,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            mentions: "",
            id: generateUUID(),
            userId: getCurrentUserId() // Use current user ID from sharedCookies
        };
        await createComment(commentData);

        // Fetch updated comments for the specific feed
        const comments = await fetchCommentItems(feedId);

        return feeds.map(feed => {
            if (String(feed.feedItem?.id) === feedId) {
                console.log('Added new comment and fetched updated comments:', comments);
                return {
                    ...feed,
                    feedItem: {
                        ...feed.feedItem!,
                        comments
                    },
                    commentCount: comments.length
                };
            }
            return feed;
        });
    } catch (error) {
        console.error('Error adding new comment to feed:', error);
        throw error; // Re-throw to handle in UI
    }
};

export const createComment = async (commentDTO: CommentDTO): Promise<void> => {
    try {
        const commentApi = createCommentApi();
        await commentApi.createComment(commentDTO);
        console.log('Comment created successfully');
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};

export const toggleLike = async (feeds: FeedWithOtherDTO[], feedId: string, isCurrentlyLiked: boolean): Promise<FeedWithOtherDTO[]> => {
    try {
        if (isCurrentlyLiked) {
            // Unlike the feed
            await unlikeFeed(feedId);
        } else {
            // Like the feed
            await likeFeed(feedId);
        }

        // Update the feed state optimistically
        return feeds.map(feed => {
            if (String(feed.feedItem?.id) === feedId) {
                const newLikeCount = isCurrentlyLiked
                    ? Math.max(0, (feed.likeCount || 0) - 1)
                    : (feed.likeCount || 0) + 1;

                return {
                    ...feed,
                    likeCount: newLikeCount,
                    feedItem: {
                        ...feed.feedItem!,
                        likesCount: newLikeCount
                    }
                };
            }
            return feed;
        });
    } catch (error) {
        console.error('Error toggling like on feed:', error);
        throw error; // Re-throw to handle in UI
    }
};

export const likeFeed = async (feedId: string): Promise<void> => {
    try {
        const likeApi = createLikeApi();
        const currentUserId = getCurrentUserId();
        
        const likeData: LikeDTO = {
            id: generateUUID(),
            parentType: 'feed',
            parentId: feedId,
            createdAt: new Date().toISOString(),
            userId: currentUserId // Use current user ID from sharedCookies
        };

        console.log('Liking feed with user ID:', currentUserId);
        await likeApi.createLike(likeData);
        console.log('Feed liked successfully');
    } catch (error) {
        console.error('Error liking feed:', error);
        throw error;
    }
};

export const unlikeFeed = async (feedId: string): Promise<void> => {
    try {
        const likeApi = createLikeApi();
        const currentUserId = getCurrentUserId();
        console.log('Unliking feed with user ID:', currentUserId);
        // First, find the like ID for this user and feed
        await likeApi.deleteLikeByParentIdAndUserId(feedId, currentUserId);
    } catch (error) {
        console.error('Error unliking feed:', error);
        throw error;
    }
};


export const checkIfLiked = async (feedId: string): Promise<boolean> => {
    try {
        const currentUserId = getCurrentUserId();
        
        // Don't check for anonymous users
        if (currentUserId === 'anonymous-user') {
            return false;
        }
        
        const likeApi = createLikeApi();
        console.log('Checking like status for user:', currentUserId, 'feed:', feedId);
        
        const response = await likeApi.checkLikeExists(feedId, currentUserId);
        const isLiked = response.data || false;
        
        console.log('Like status result:', isLiked);
        return isLiked;
    } catch (error) {
        console.error('Error checking like status:', error);
        return false;
    }
};

// Export the helper function for use in other modules
export { getCurrentUserId };
