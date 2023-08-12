"use client"

import * as React from 'react';
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./searchBar";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { accountInfo, productType } from '../interface/interface';
import { useRouter } from 'next/navigation';

interface headerProps {
    userInfo: accountInfo,
    signOut: () => void,
    setPopup: () => void,
    toggleCart: () => void,
    searchBarSearch: (query : string) => void
}

const Header : React.FC<headerProps> = ({ userInfo, signOut, setPopup, toggleCart, searchBarSearch }) => {
    const router = useRouter();

    return (
        <header className='header block relative z-[100] max-w-full px-8 bg-white'>
            <div className='header-content flex items-center justify-evenly py-3 gap-8'>
                <Link className='flex items-center cursor-pointer' href='/'>
                    <Image
                        src='ME_icon.svg'
                        alt='Mythic Emporium'
                        height={120}
                        width={320}
                    />
                </Link>
                <SearchBar searchBarSearch={searchBarSearch} />
                <div className='user_actions flex items-center'>
                    <div className='user_btns flex items-center gap-2'>
                        {   // Check if userInfo exists
                            (!userInfo.user_id)?
                            <button className='text-white bg-violet-500 border-solid border border-violet-500 rounded p-1 max-h-full'
                            onClick={() => setPopup()}>
                                Sign In
                            </button>
                            :
                            <button className='text-white bg-violet-500 border-solid border border-violet-500 rounded p-1 max-h-full'
                            onClick={() => signOut()}>
                                Sign Out
                            </button>
                        }
                        {   // Check if user is an admin
                            userInfo.isAdmin && 
                            <button className='border-solid border text-rose-700 border-rose-700 rounded p-1'
                            onClick={() => router.push('InventoryManagement')}>
                                <BiUser size={24} />
                            </button>
                        }
                        <button className='border-solid border text-violet-500 border-violet-500 rounded p-1'
                        onClick={toggleCart}>
                            <AiOutlineShoppingCart size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;