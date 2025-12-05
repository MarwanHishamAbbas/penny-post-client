# React Query Setup Guide

A modular, type-safe React Query setup for your Next.js application.

## 📁 File Structure

```
lib/
  api.ts              # Base fetcher and configuration
  api/
    posts.ts          # Posts API endpoints and types
hooks/
  usePosts.ts         # React Query hooks for posts
```

---

## 🔧 Installation

```bash
npm install @tanstack/react-query
```

---

## 🚀 Setup

### 1. Configure the Provider

In your root layout (`app/layout.tsx`):

```tsx
"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function RootLayout({ children }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
```

### 2. Set Environment Variable

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## 📚 How It Works

### Base Fetcher (`lib/api.ts`)

The core fetcher function handles all HTTP requests:

```typescript
fetcher<T>(endpoint: string, options?: FetcherOptions): Promise<T>
```

**Features:**

- Automatically adds `Content-Type: application/json`
- Throws custom `ApiError` on failures (with status code)
- Supports GET, POST, PUT, DELETE, PATCH
- Type-safe responses

**Example:**

```typescript
// GET request
const data = await fetcher<PostsResponse>("/posts?page=0");

// POST request
const result = await fetcher<{ post: Post }>("/posts", {
  method: "POST",
  body: { title: "My Post", content: "..." },
});
```

---

### API Functions (`lib/api/posts.ts`)

Organized endpoints for a specific resource:

```typescript
export const postsApi = {
  getAll: (params?: PostsParams) => Promise<PostsResponse>
  getById: (id: number) => Promise<{ post: Post }>
  create: (data: CreatePostData) => Promise<{ post: Post }>
  update: (id: number, data: Partial<CreatePostData>) => Promise<{ post: Post }>
  delete: (id: number) => Promise<{ message: string }>
}
```

**Why separate this?**

- Reusable outside of React (e.g., server actions)
- Easy to test
- Single source of truth for endpoints

---

### Query Keys (`hooks/usePosts.ts`)

Query keys help React Query manage cache:

```typescript
export const postKeys = {
  all: ["posts"], // Base key for all posts
  lists: () => ["posts", "list"], // All post lists
  list: (params) => ["posts", "list", params], // Specific list with filters
  details: () => ["posts", "detail"], // All post details
  detail: (id) => ["posts", "detail", id], // Specific post detail
};
```

**Why this matters:**

```typescript
// When you create a post, invalidate all lists
queryClient.invalidateQueries({ queryKey: postKeys.lists() });

// When you update post #5, invalidate just that post
queryClient.invalidateQueries({ queryKey: postKeys.detail(5) });
```

---

### React Query Hooks

#### **Fetching Data (Queries)**

**Get all posts:**

```typescript
const { data, isLoading, error } = usePosts({ page: "0", search: "react" });
```

**Get single post:**

```typescript
const { data, isLoading } = usePost(5);
```

**Options:**

- `data` - The response data
- `isLoading` - True while fetching
- `error` - Error object if request fails
- `refetch` - Function to manually refetch

---

#### **Modifying Data (Mutations)**

**Create a post:**

```typescript
const createPost = useCreatePost();

createPost.mutate(
  {
    title: "My Post",
    content: "Content here",
    author_id: 1,
    tags: [1, 3, 5],
  },
  {
    onSuccess: (data) => {
      console.log("Created!", data.post);
    },
    onError: (error) => {
      console.error("Failed:", error.message);
    },
  }
);
```

**Update a post:**

```typescript
const updatePost = useUpdatePost();

updatePost.mutate({
  id: 5,
  data: { title: "Updated Title" },
});
```

**Delete a post:**

```typescript
const deletePost = useDeletePost();

deletePost.mutate(5);
```

**Mutation properties:**

- `mutate()` - Trigger the mutation
- `isPending` - True while request is in progress
- `isSuccess` - True after successful request
- `isError` - True if request failed
- `error` - Error object

---

## 💡 Usage Examples

### Display Posts List

```tsx
"use client";
import { usePosts } from "@/hooks/usePosts";

export default function PostsPage() {
  const { data, isLoading, error } = usePosts({
    page: "0",
    status: "published",
  });

  if (isLoading) return <div>Loading posts...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Posts ({data?.total})</h1>
      {data?.rows.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>
            By {post.author_name} in {post.category_name}
          </p>
          <div>Tags: {post.tags.join(", ")}</div>
        </article>
      ))}
    </div>
  );
}
```

---

### Create Post Form

```tsx
"use client";
import { useCreatePost } from "@/hooks/usePosts";
import { useState } from "react";

export function CreatePostForm() {
  const createPost = useCreatePost();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createPost.mutate(
      {
        title,
        content,
        author_id: 1,
        tags: [1, 3],
      },
      {
        onSuccess: () => {
          alert("Post created successfully!");
          setTitle("");
          setContent("");
        },
        onError: (error) => {
          alert(`Failed: ${error.message}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit" disabled={createPost.isPending}>
        {createPost.isPending ? "Creating..." : "Create Post"}
      </button>
    </form>
  );
}
```

---

### Search with Debounce

```tsx
"use client";
import { usePosts } from "@/hooks/usePosts";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export function PostSearch() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = usePosts({
    search: debouncedSearch,
  });

  return (
    <div>
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search posts..."
      />
      {isLoading ? <p>Searching...</p> : <p>Found {data?.total} posts</p>}
    </div>
  );
}
```

---

## 🔄 Auto Cache Updates

When you mutate data, React Query automatically updates the cache:

```typescript
// Creating a post invalidates all post lists
useCreatePost() → invalidates postKeys.lists()

// Updating post #5 invalidates that specific post AND all lists
useUpdatePost() → invalidates postKeys.detail(5) + postKeys.lists()

// Deleting a post invalidates all lists
useDeletePost() → invalidates postKeys.lists()
```

This means your UI automatically shows fresh data after mutations! 🎉

---

## 🎨 Extending for Other Resources

Copy the same pattern for authors, tags, categories, etc:

```typescript
// lib/api/authors.ts
export const authorsApi = {
  getAll: () => fetcher<AuthorsResponse>("/authors"),
  getById: (id: number) => fetcher<{ author: Author }>(`/authors/${id}`),
  create: (data: CreateAuthorData) =>
    fetcher("/authors", { method: "POST", body: data }),
  // ...
};

// hooks/useAuthors.ts
export const authorKeys = {
  all: ["authors"] as const,
  lists: () => [...authorKeys.all, "list"] as const,
  // ...
};

export function useAuthors() {
  return useQuery({
    queryKey: authorKeys.all,
    queryFn: authorsApi.getAll,
  });
}
```

---

## 🐛 Error Handling

The custom `ApiError` class provides detailed error info:

```typescript
try {
  await postsApi.create(data);
} catch (error) {
  if (error instanceof ApiError) {
    console.log(error.message); // User-friendly message
    console.log(error.status); // HTTP status code (400, 404, 500, etc)
    console.log(error.data); // Additional error data from server
  }
}
```

In components:

```typescript
const { error } = usePosts();

if (error instanceof ApiError) {
  if (error.status === 404) {
    return <div>No posts found</div>;
  }
  if (error.status === 500) {
    return <div>Server error, please try again</div>;
  }
}
```

---

## ✅ Best Practices

1. **Always use query keys factory** - Makes cache invalidation easier
2. **Type everything** - Define types for requests and responses
3. **Handle loading states** - Show spinners/skeletons while fetching
4. **Handle errors gracefully** - Display user-friendly error messages
5. **Use optimistic updates** - For better UX (advanced)
6. **Enable devtools in development** - See what's in the cache

---

## 🛠️ Optional: React Query DevTools

Add this to see your cache in action:

```bash
npm install @tanstack/react-query-devtools
```

```tsx
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={queryClient}>
  {children}
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>;
```

---

## 📝 Summary

- **`lib/api.ts`** → Base fetcher (handles HTTP)
- **`lib/api/posts.ts`** → API functions (what to fetch)
- **`hooks/usePosts.ts`** → React hooks (how to use in components)
- **Query keys** → Organize cache
- **Mutations** → Auto-invalidate cache after changes

That's it! You now have a scalable, type-safe API layer. 🚀
