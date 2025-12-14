import { fetcher } from "@/src/shared/lib/api";

export type Post = {
  id: number;
  title: string;
  content: string;
  status: string;
  created_at: string;
  updated_at: string;
  author_name: string;
  overview: string;
  category: string;
  cover_url: string;
};

export type PostsResponse = {
  nextCursor?: string;
  posts: Omit<Post, "content" | "updated_at" | "status">[];
  hasMore: boolean;
};

export type PostsParams = {
  search?: string;
  cursor?: string;
  is_featured?: boolean;
};

export type CreatePostData = {
  title: string;
  content: string;
  author_id: number;
  category_id?: number;
};

export const postsApi = {
  getAll: (params?: PostsParams) => {
    const cleanParams: Record<string, string> = {};

    if (params?.cursor) cleanParams.cursor = params.cursor;
    if (params?.is_featured) {
      cleanParams.is_featured = "true";
    }
    const queryString =
      Object.keys(cleanParams).length > 0
        ? "?" + new URLSearchParams(cleanParams).toString()
        : "";
    return fetcher<PostsResponse>(`/posts${queryString}`);
  },

  searchAll: (params?: PostsParams) => {
    const cleanParams: Record<string, string> = {};
    if (params?.search) cleanParams.search = params.search;

    const queryString =
      Object.keys(cleanParams).length > 0
        ? "?" + new URLSearchParams(cleanParams).toString()
        : "";
    return fetcher<PostsResponse>(`/posts/search${queryString}`);
  },

  getById: (id: number) => {
    return fetcher<{ post: Post }>(`/posts/${id}`);
  },

  create: (data: CreatePostData) => {
    return fetcher<{ message: string; post: Post }>("/posts/create", {
      method: "POST",
      body: data,
    });
  },

  update: (id: number, data: Partial<CreatePostData>) => {
    return fetcher<{ message: string; post: Post }>(`/posts/${id}`, {
      method: "PUT",
      body: data,
    });
  },

  delete: (id: number) => {
    return fetcher<{ message: string }>(`/posts/${id}`, {
      method: "DELETE",
    });
  },
};
