/* tslint:disable */
/* eslint-disable */
/**
 * Ms Commentlike API
 * Ms Commentlike API documentation
 *
 * The version of the OpenAPI document: 0.0.1
 * Contact: 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */



/**
 * 
 * @export
 * @interface FeedItemDTO
 */
export interface FeedItemDTO {
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'id': string;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'userId': string;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'content'?: string;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'imageUrl'?: string;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'videoUrl'?: string;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'visibility'?: FeedItemDTOVisibilityEnum;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'location'?: string;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'createdAt': string;
    /**
     * 
     * @type {string}
     * @memberof FeedItemDTO
     */
    'updatedAt': string;
}

export const FeedItemDTOVisibilityEnum = {
    Public: 'PUBLIC',
    Private: 'PRIVATE',
    FriendsOnly: 'FRIENDS_ONLY'
} as const;

export type FeedItemDTOVisibilityEnum = typeof FeedItemDTOVisibilityEnum[keyof typeof FeedItemDTOVisibilityEnum];


