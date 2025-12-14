import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { postsApi } from "../api/posts-api";
import { postKeys } from "../api/posts-keys";

export function usePosts(params?: { is_featured?: boolean }) {
  return useInfiniteQuery({
    queryKey: postKeys.list(params),
    queryFn: ({ pageParam: cursor }) => postsApi.getAll({ ...params, cursor }),
    initialPageParam: undefined as string | undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}

export function useSearchPosts(params?: { search: string | undefined }) {
  return useQuery({
    queryKey: postKeys.list(params),
    queryFn: () => postsApi.searchAll({ ...params }),
    enabled: !!params?.search,
  });
}
