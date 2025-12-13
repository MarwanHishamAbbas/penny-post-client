import { type FC } from 'react'
import { Post } from '../api/posts-api'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/src/components/ui/card'
import Image from 'next/image'
import { Dot } from 'lucide-react'
import Link from 'next/link'
import { generateSlug } from '@/src/shared/lib/utils'


type PostCardProps = {
    post: Omit<Post, "content" | "updated_at" | "status">;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
    const { author_name, category, created_at, overview, title, } = post
    return <Link href={`/posts/${generateSlug(title)}`}>

        <Card>
            <CardHeader>
                <Image src={'/money.png'} width={350} height={350} alt='' className='w-full h-64 object-cover rounded-[12px]' />
                <CardDescription className='flex items-center text-primary/50! text-xs!'>
                    <span className=' px-2 py-1 bg-accent rounded-full'>{category}</span>
                    <Dot className='text-border' />
                    <span className=''>4 min read</span>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <CardTitle>
                    <h3 className='leading-normal text-lg'>{title}</h3>
                </CardTitle>
                <p className='text-sm text-primary/50 line-clamp-3'>{overview}</p>
                <hr className='border-border/50' />
            </CardContent>
            <CardFooter className='flex items-center justify-between text-primary/50'>
                <div>
                    <span className='text-xs'>Written by</span>
                    <p className='text-sm font-medium'>{author_name}</p>
                </div>
                <div>
                    <span className='text-xs'>Posted on</span>
                    <p className='text-sm font-medium'>{new Date(created_at).toDateString()}</p>
                </div>

            </CardFooter>
        </Card>
    </Link>
}

export default PostCard