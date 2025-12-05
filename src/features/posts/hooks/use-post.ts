import { useQuery } from "@tanstack/react-query";
import { postsApi, PostsParams } from "../api/posts-api";
import { postKeys } from "../api/posts-keys";

export function usePosts(params?: PostsParams) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postsApi.getAll(params),
    refetchOnMount: false,
  });
}
