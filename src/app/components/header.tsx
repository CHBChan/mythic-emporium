"use client"

import * as React from 'react';
import Link from "next/link";
import Image from "next/image";
import SearchBar from "./searchBar";
import { BiUser } from "react-icons/bi";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { accountInfo } from '../interface/data';

interface headerProps {
    userInfo: accountInfo,
    signOut: () => void,
    setPopup: () => void
}

const Header : React.FC<headerProps> = ({ userInfo, signOut, setPopup }) => {

    return (
        <header className='header block relative z-[100] max-w-full px-8 bg-white'>
            <div className='header-content flex items-center justify-evenly py-3 gap-8'>
                <Link className='flex items-center cursor-pointer' href='/'>
                    <Image
                        src='next.svg'
                        alt='Mythic Emporium'
                        height={60}
                        width={160}
                    />
                </Link>
                <SearchBar />
                <div className='user_actions flex items-center'>
                    <div className='user_btns flex items-center gap-2'>
                        {   // Check if userInfo exists
                            (!userInfo.user_id)?
                            <button className='text-white bg-violet-500 border-solid border-2 border-violet-500 rounded p-1 max-h-full'
                            onClick={() => setPopup()}>
                                Sign In
                            </button>
                            :
                            <button className='text-white bg-violet-500 border-solid border-2 border-violet-500 rounded p-1 max-h-full'
                            onClick={() => signOut()}>
                                Sign Out
                            </button>
                        }
                        <button className='border-solid border-2 text-violet-500 border-violet-500 rounded p-1'>
                            <BiUser size={24} />
                        </button>
                        <button className='border-solid border-2 text-violet-500 border-violet-500 rounded p-1'>
                            <AiOutlineShoppingCart size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;