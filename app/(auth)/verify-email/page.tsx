
import { MailCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

type VerifyEmailPageProps = {
    searchParams: Promise<{ email: string, token?: string }>
}

const VerifyEmailPage: FC<VerifyEmailPageProps> = async ({ searchParams }) => {

    const { email, token } = await searchParams


    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        Penny Post
                    </Link>
                </div>
                {token ? <p>Email Verified</p> : <div className="flex flex-1 items-center justify-center text-center">
                    <div className="w-full max-w-sm mx-auto">
                        <MailCheck className='mx-auto size-20 stroke-green-600' />
                        An email has been sent to {email}

                    </div>
                </div>}
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    loading='eager'
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
                    fill
                    src="/placeholder.avif"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                />
            </div>
        </div>
    )
}

export default VerifyEmailPage