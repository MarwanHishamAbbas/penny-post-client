import RegisterForm from '@/src/features/auth/components/register-form'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <Link href="/" className="flex items-center gap-2 font-medium">
                        Penny Post
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-sm">
                        <RegisterForm />
                    </div>
                </div>
            </div>
            <div className="bg-muted relative hidden lg:block">
                <Image
                    loading='eager'
                    fill
                    src="/placeholder.avif"
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
    )
}

export default page