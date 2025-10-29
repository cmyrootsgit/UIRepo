// api/services/post.ts
import { baseHttpClient } from "../httpClient/baseHttpClient";
import { PostsResponse, PostFromAPI } from "../../types/postTypes";

export const fetchPosts = async (
  userId: string,
  token: string
): Promise<PostFromAPI[]> => {
  const res = await baseHttpClient.get<PostsResponse>(
    `/posts/getall/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.posts; 
};
