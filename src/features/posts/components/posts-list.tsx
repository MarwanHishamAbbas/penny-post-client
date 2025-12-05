'use client'

import { usePosts } from "../hooks/use-post";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card"

type PostsListProps = {
    searchParams: {
        search?: string;
        status?: string;
    };
};

export function PostsList({ searchParams }: PostsListProps) {
    // React Query will use the prefetched data from server
    const { data, isLoading, error } = usePosts(searchParams);

    if (error) {
        return (
            <div className="text-red-500">
                Failed to load posts: {error.message}
            </div>
        );
    }

    if (isLoading) {
        return <div>Loading posts...</div>;
    }

    if (!data || data.rows.length === 0) {
        return <div>No posts found.</div>;
    }

    return (

        data.rows.map((post) => (
            <Card key={post.id}>
                <CardHeader>
                    <CardTitle>{post.title}</CardTitle>
                    <CardDescription>{post.overview}</CardDescription>
                    <CardAction>Card Action</CardAction>
                </CardHeader>
                <CardContent>
                    <p>{post.category}</p>
                </CardContent>
                <CardFooter>
                    <p>{post.author_name}</p>
                </CardFooter>
            </Card>
        ))
    )

}