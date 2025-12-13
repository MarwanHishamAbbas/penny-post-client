import Link from 'next/link'
import { SearchCommand } from './search-command'
import { buttonVariants } from './ui/button'
import UserNav from '../features/auth/components/user-nav'
import { getServerSession } from '../features/auth/server/get-current-user'



const Navbar = async () => {
    const { user } = await getServerSession()

    return (
        <header className='bg-white h-[60px] shadow-[0_1px_42px_rgba(0,0,0,0.1)] '>
            <nav className='max-w-7xl px-2 mx-auto flex items-center justify-between h-full '>
                <h1 className='text-base md:text-lg'><strong>Penny</strong>Post</h1>
                <ul className='flex items-center gap-6 text-sm max-sm:hidden'>
                    <li><Link href={'/'} className={buttonVariants({ variant: 'link', className: 'text-sm font-normal' })}>Home</Link></li>
                    <li><Link href={'/about'} className={buttonVariants({ variant: 'link', className: 'text-sm font-normal' })}>About</Link></li>
                    <li><Link href={'/categories'} className={buttonVariants({ variant: 'link', className: 'text-sm font-normal' })}>Categories</Link></li>
                    <li><Link href={'/authors'} className={buttonVariants({ variant: 'link', className: 'text-sm font-normal' })}>Authors</Link></li>
                </ul>
                <div className='flex items-center gap-2 '>
                    <SearchCommand />
                    <UserNav user={user} />
                </div>

            </nav>
        </header>
    )
}

export default Navbar