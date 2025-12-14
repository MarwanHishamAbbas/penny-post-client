
import React from 'react'
import { Badge } from '@/src/components/ui/badge'
import { VerifiedIcon } from 'lucide-react'

const Hero = () => {
    return (
        <div className='text-center h-[75vh] grid place-content-center space-y-8 text-primary'>
            <Badge className="rounded-full pl-[3px] mx-auto" variant="outline">
                <VerifiedIcon className='size-4!' />
                Trusted by 1,000,000+ professionals
            </Badge>

            <h1 className='text-4xl sm:text-5xl md:text-6xl font-semibold mx-auto'>
                Level Up Your Money <br className='max-sm:hidden' />
                Game, Financial Freedom <br className='max-sm:hidden' />
                starts with just PennyPost.
            </h1>
            <p className='text-primary/80'> Practical tips to help you unlock actionable <br />insights in making smarter financial decisions.</p>
        </div>
    )
}

export default Hero