



import { Button } from './ui/button'


const Navbar = () => {


    return (
        <header className='bg-white h-14'>
            <nav className='max-w-5xl px-2 mx-auto flex items-center justify-between h-full'>
                <h1>Penny Post</h1>

                <Button variant={'destructive'}>Logout</Button>
            </nav>
        </header>
    )
}

export default Navbar