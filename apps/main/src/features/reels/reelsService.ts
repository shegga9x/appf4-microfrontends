import type { ReelDTO } from "@repo/api-client";

export const getHardcodedReels = (): ReelDTO[] => [
    {
        id: "1",
        videoUrl: 'https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif',
        userId: '@funnycats',
        title: 'Funny Cat Video',
        createdAt: ""
    },
    {
        id: "2",
        videoUrl: 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
        userId: '@dancingdogs',
        title: 'Dancing Dogs',
        createdAt: ""
    },
    {
        id: "3",
        videoUrl: 'https://media.giphy.com/media/26tn33aiTi1jkl6H6/giphy.gif',
        userId: '@foodie_life',
        title: 'Cooking Tips',
        createdAt: ""
    },
    {
        id: "4",
        videoUrl: 'https://media.giphy.com/media/l2Je66zG6mAAZxgqI/giphy.gif',
        userId: '@travel_vibes',
        title: 'Travel Adventures',
        createdAt: ""
    }
];

export const getFallbackReels = (): ReelDTO[] => [
    {
        id: "1",
        videoUrl: 'https://media.giphy.com/media/3o7buirYcmV5nSwIRW/giphy.gif',
        userId: '@funnycats',
        title: 'Funny Cat Video',
        createdAt: ""
    }
];
