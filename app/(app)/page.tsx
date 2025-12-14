import Hero from '@/src/components/pages/home/hero';
import { postsApi } from '@/src/features/posts/api/posts-api';
import { postKeys } from '@/src/features/posts/api/posts-keys';
import FeaturedCardList from '@/src/features/posts/components/featured-cards-list';

import { PostsList } from '@/src/features/posts/components/posts-list';
import {
  HydrationBoundary,
  QueryClient,
  dehydrate
} from '@tanstack/react-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Penny Post',
  description: 'Browse our collection of blog posts about web development',
};





const Page = async () => {

  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: postKeys.list(),
    queryFn: () => postsApi.getAll(),
    initialPageParam: undefined,
  });




  return (
    <main className='space-y-32'>
      <Hero />

      <FeaturedCardList />
      <div className='md:w-3/4 mx-auto grid grid-cols-2'>
        <h2 className='text-4xl font-semibold'>Fresh Reads, <br />
          Same Money Grind.</h2>
        <p className='text-sm'>Get the hottest money hacks — smart ways to make your
          cash work harder, and tricks to keep more of it in your
          pocket. Whether you’re stacking, flipping, or just trying to
          stop your wallet from crying, we’ve got the game plan for
          your financial glow-up!</p>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostsList />
      </HydrationBoundary>
    </main>
  )
}

export default Page