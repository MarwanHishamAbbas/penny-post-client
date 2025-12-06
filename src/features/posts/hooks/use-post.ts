// hooks/use-post.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { postsApi } from "../api/posts-api";
import { postKeys } from "../api/posts-keys";

export function usePosts(params?: { search?: string; status?: string }) {
  return useInfiniteQuery({
    queryKey: postKeys.list(params),
    queryFn: ({ pageParam: cursor }) => postsApi.getAll({ ...params, cursor }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
