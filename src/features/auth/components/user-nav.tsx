'use client'

import { UserIcon, LogOut } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/src/components/ui/dropdown-menu'
import { Button, buttonVariants } from '@/src/components/ui/button'
import Image from 'next/image'
import { ServerSession } from '../server/get-current-user'
import { FC, useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/auth-context'
import { Spinner } from '@/src/components/ui/spinner'

type UserNavProps = {
    user: ServerSession['user']
}

const UserNav: FC<UserNavProps> = ({ user }) => {
    const { isLoading, logout } = useAuth()
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
    }

    if (user) {
        return (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant='secondary' size='icon' className='overflow-hidden rounded-full'>
                        <Image
                            src='/money.png'
                            className='size-8 rounded-full'
                            width={32}
                            height={32}
                            alt='User avatar'
                        />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className='w-56'>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <UserIcon />
                            <span className='text-popover-foreground'>My Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            disabled={isLoading}
                            variant='destructive'
                            onSelect={(e) => {
                                // Prevent dropdown from closing
                                e.preventDefault()
                                handleLogout()
                            }}
                        >
                            {isLoading ? <Spinner /> : <LogOut />}
                            <span className='text-destructive'>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        )
    } else {
        return (
            <Link href={'/login'} className={buttonVariants({ size: "sm", className: 'rounded-full' })}>
                Login
            </Link>
        )
    }
}

export default UserNav