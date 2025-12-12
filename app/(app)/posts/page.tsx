import { postsApi } from '@/src/features/posts/api/posts-api';
import { postKeys } from '@/src/features/posts/api/posts-keys';
import { PostsList } from '@/src/features/posts/components/posts-list';
import {
    HydrationBoundary,
    QueryClient,
    dehydrate
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog Posts | Penny Post',
    description: 'Browse our collection of blog posts about web development',
};

import { type FC } from 'react'

type PageProps = {
    searchParams: Promise<{ search?: string | undefined, status?: string | undefined }>
}

const Page: FC<PageProps> = async ({ searchParams }) => {

    const { search, status } = await searchParams


    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: postKeys.list({ search, status }),
        queryFn: () => postsApi.getAll({ search, status }),
        initialPageParam: undefined,
    });

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <PostsList searchParams={{ search, status }} />
        </HydrationBoundary>
    )
}

export default Page