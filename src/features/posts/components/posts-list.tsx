'use client'

import { Button } from "@/src/components/ui/button";
import { usePosts } from "../hooks/use-post";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"
import { SearchCommand } from "@/src/components/search-command";

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
            <SearchCommand />
            <div className="space-y-10">
                {/* Render all pages */}
                {data.pages.map((page, pageIndex) => (
                    <div key={pageIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {page.posts.map((post) => (
                            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-200">
                                <CardHeader>
                                    <CardTitle className="line-clamp-2 min-h-14">
                                        {post.title || "Untitled Post"}
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3 min-h-18">
                                        {post.content.substring(0, 150)}...
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex gap-2 flex-wrap min-h-8">
                                        {post.tags.length > 0 ? (
                                            post.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                                                >
                                                    {tag}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-xs text-gray-400">No tags</span>
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 font-medium">
                                        {post.category || "Uncategorized"}
                                    </p>
                                </CardContent>
                                <CardFooter className="border-t pt-4">
                                    <p className="text-sm text-gray-500">
                                        By {post.author_name}
                                    </p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ))}
            </div>

            {/* Load More Section */}
            <div className="mt-12 flex flex-col items-center gap-4">
                {hasNextPage ? (
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
                ) : (
                    data.pages.length > 0 && (
                        <div className="text-center py-8">
                            <p className="text-gray-500 text-lg">🎉 You&apos;ve reached the end!</p>
                            <p className="text-gray-400 text-sm mt-2">No more posts to load</p>
                        </div>
                    )
                )}
            </div>
        </main>
    )
}