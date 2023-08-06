"use client"

import * as React from 'react';
import Link from "next/link";
import { categories } from '../data/data';
import { BiCaretDown } from 'react-icons/bi';

const CategoryNavBar : React.FC = () => {

    return (
        <section className='nav_section relative z-[100] block'>
            <nav className='relative flex items-stretch bg-violet-500 min-h-[64px]'>
                <div className='nav_menu flex items-stretch grow px-4'>
                    <div className='nav_start flex items-stretch justify-start mr-auto'>
                        {categories.map((category) => (
                            <div key={category.name + '_menu'} className='relative flex items-stretch grow-0 shrink-0 p-0'>
                                <span className='flex items-center  gap-2 font-bold text-white cursor-pointer px-4'>
                                    {category.name}
                                    <BiCaretDown />
                                </span>
                                {category.subcategory.map((sub) => (
                                    <div key={sub+'_dropdown'}>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </section>
    )
};

export default CategoryNavBar;