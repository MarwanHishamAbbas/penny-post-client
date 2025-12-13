'use client'

import { Button } from "@/src/components/ui/button";
import { usePosts } from "../hooks/use-post";

import PostCard from "./post-card";

type PostsListProps = {
    searchParams: {
        search?: string;
        status?: string;
    };
};

export function PostsList({ searchParams }: PostsListProps) {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error
    } = usePosts(searchParams);



    if (error) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-red-500 text-lg font-semibold">Failed to load posts</p>
                    <p className="text-gray-600 mt-2">{error.message}</p>
                </div>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading posts...</p>
                </div>
            </div>
        );
    }

    if (!data || data.pages.length === 0) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <p className="text-gray-500 text-lg">No posts found.</p>
                </div>
            </div>
        );
    }

    return (
        <main className="container mx-auto px-4 py-10 max-w-7xl">
            <div className="space-y-10">
                {/* Render all pages */}
                {data.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {page.posts.map((post) => (
                            <PostCard post={post} key={post.id} />
                        ))}
                    </div>
                ))}
            </div>

            {/* Load More Section */}
            <div className="mt-12 flex flex-col items-center gap-4">
                {hasNextPage && (
                    <Button
                        onClick={() => fetchNextPage()}
                        disabled={isFetchingNextPage}
                        size="lg"
                        className="min-w-[200px]"
                    >
                        {isFetchingNextPage ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Loading...
                            </>
                        ) : (
                            'Load More Posts'
                        )}
                    </Button>
                )}
            </div>
        </main>
    )
}