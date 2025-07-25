import { CommentResourceApi, Configuration, FeedItemResourceApi, LikeResourceApi, UserResourceApi } from "@repo/api-client";
import { sharedCookies } from '@repo/shared-cookies';

export const createApiConfig = (servicePath: string): Configuration => {
  const basePath =
    `${process.env.BACKEND_URL}${servicePath}` || "https://appf24.io.vn";

  return new Configuration({
    basePath,
    baseOptions: {
      headers: {
        Authorization: `Bearer ${sharedCookies.getAuthTokens()?.accessToken || ''}`,
      },
    },
  });
};

// Usage: Feed API
export const createFeedApi = () => {
  return new FeedItemResourceApi(
    createApiConfig(process.env.NEXT_PUBLIC_SERVICE_PATH_MSFEED || "/services/msfeed")
  );
};
export const createCommentApi = () => {
  return new CommentResourceApi(
    createApiConfig(process.env.NEXT_PUBLIC_SERVICE_PATH_MSCOMMENTLIKE || "/services/mscommentlike")
  );
};
export const createLikeApi = () => {
  return new LikeResourceApi(
    createApiConfig(process.env.NEXT_PUBLIC_SERVICE_PATH_MSCOMMENTLIKE || "/services/mslike")
  );
};
export const createUserApi = () => {
  return new UserResourceApi(
    createApiConfig(process.env.NEXT_PUBLIC_SERVICE_PATH_MSUSER || "/services/msuser")
  );
};