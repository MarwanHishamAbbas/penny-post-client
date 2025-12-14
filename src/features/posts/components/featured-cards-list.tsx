
import { postsApi } from '@/src/features/posts/api/posts-api';
import { postKeys } from '@/src/features/posts/api/posts-keys';


import {
    HydrationBoundary,
    QueryClient,
    dehydrate
} from '@tanstack/react-query';
import { Metadata } from 'next';
import FeaturedCardsList from './featured-card';

export const metadata: Metadata = {
    title: 'Penny Post',
    description: 'Browse our collection of blog posts about web development',
};





const FeaturedCardList = async () => {

    const queryClient = new QueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: postKeys.list({ is_featured: true }),
        queryFn: () => postsApi.getAll({ is_featured: true }),
        initialPageParam: undefined,
    });




    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <FeaturedCardsList />

        </HydrationBoundary>
    )
}

export default FeaturedCardList