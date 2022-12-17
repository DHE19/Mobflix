import {BellIcon, MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);   

    useEffect( () =>{

        const handleScroll = () =>setIsScrolled(window.scrollY > 0 ? true:false);        
        window.addEventListener('scroll',handleScroll);

        return () => window.removeEventListener('scroll',handleScroll);
    },[]);

    return (
        <header className={`${isScrolled ? 'bg-[#141414]':''}`}>
            <div className="flex items-center gap-4 md:gap-10">
                <img
                width={100}
                height={100}
                src="https://rb.gy/ulxxee" alt="MobFlix"
                className=" cursor-pointer object-contain"/>

                <ul className="hidden gap-4 md:flex ">
                    <li className="nav-link">Home</li>
                    <li className="nav-link">TV Shows</li>
                    <li className="nav-link">Movies</li>
                    <li className="nav-link">New & Popular</li>
                    <li className="nav-link">My List</li>
                </ul>

            </div>
            <div className='flex gap-4 items-center text-sm font-light'>
                <MagnifyingGlassIcon className='h-6 w-6'/>
                <p className='hidden lg:inline'>Kids</p>
                <BellIcon className='h-6 w-6'/>
                <Link href={'/account'}>
                    <img src="https://rb.gy/g1pwyx" />
                </Link>
            </div>
        </header>
    )
}

export default Header

