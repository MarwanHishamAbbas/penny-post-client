'use client'

import { usePosts } from "../hooks/use-post";


import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/src/components/ui/card'
import Image from 'next/image'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import { generateSlug } from '@/src/shared/lib/utils'



export default function FeaturedCardsList() {
    const {
        data,
    } = usePosts({ is_featured: true });



    return (

        <div className="md:w-3/4 mx-auto">
            {/* Render all pages */}
            {data && data.pages.map((page) => (

                page.posts.map(({ title, author_name, category, cover_url, created_at, id, overview }) => (
                    <Link key={id} href={`/posts/${generateSlug(title)}`}>

                        <Card className="grid grid-cols-2 p-3">
                            <CardContent className="justify-between flex flex-col gap-4">
                                <div className="space-y-4">
                                    <CardDescription className='flex items-center text-primary/50! text-xs! gap-2'>
                                        <span className=' px-3 py-1.5 bg-accent rounded-full'>Featured</span>
                                        <span className=' px-3 py-1.5 bg-accent rounded-full'>{category}</span>
                                        <Dot className='text-border' />
                                        <span className=''>4 min read</span>
                                    </CardDescription>
                                    <CardTitle className="line-clamp-4">
                                        <h3 className=' font-semibold text-3xl'>{title}</h3>
                                    </CardTitle>
                                    <p className='text-sm text-primary/50 line-clamp-3'>{overview}</p>
                                </div>
                                <div className="space-y-4">
                                    <hr className='border-border/50' />
                                    <div className='flex items-center justify-between text-primary/50'>
                                        <div>
                                            <span className='text-xs'>Written by</span>
                                            <p className='text-sm font-medium'>{author_name}</p>
                                        </div>
                                        <div>
                                            <span className='text-xs'>Posted on</span>
                                            <p className='text-sm font-medium'>{new Date(created_at).toDateString()}</p>
                                        </div>

                                    </div>
                                </div>
                            </CardContent>
                            <Image src={cover_url ?? "/money.png"} width={450} height={450} alt='' className='w-full h-[400px] object-cover rounded-[12px]' />
                        </Card>
                    </Link>
                ))

            ))}


            {/* Load More Section */}

        </div>
    )
}