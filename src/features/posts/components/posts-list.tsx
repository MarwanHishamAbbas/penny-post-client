'use client'

import { Button } from "@/src/components/ui/button";
import { usePosts } from "../hooks/use-post";

import PostCard from "./post-card";



export function PostsList() {
    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = usePosts();



    return (

        <div>
            {/* Render all pages */}
            {data && data.pages.map((page, pageIndex) => (
                <div key={pageIndex} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {page.posts.map((post) => (
                        <PostCard post={post} key={post.id} />
                    ))}
                </div>
            ))}


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
        </div>
    )
}