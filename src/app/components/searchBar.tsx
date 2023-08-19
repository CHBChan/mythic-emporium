"use client"

import React from 'react';

import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { GiCancel } from 'react-icons/gi';
import { categories } from '../data/data';

interface searchBarProps {
    searchBarSearch: (query : string) => void
}

const SearchBar : React.FC<searchBarProps> = ({ searchBarSearch }) => {
    const [searchQuery, setSearchQuery] = React.useState<string>('');

    const updateQuery = (query : string) => {
        setSearchQuery(query);
    };

    const clearQuery = () => {
        setSearchQuery('');
    };

    return (
        <div className='header_item flex items-center gap-8 my-4 w-6/12'>
            <div className='relative flex justify-start z-[99] mb-0 overflow-hidden border-solid border border-violet-500 rounded w-full'>
                <div className='flex rounded w-full'>
                    <div className='dropdown relative flex items-center max-w-[128px]'>
                        <select className='relative z-[0] whitespace-nowrap text-violet-500 border-violet-500 border-e px-2 bg-white w-[64] h-full cursor-pointer'>
                            {categories.map((category) => (
                                <option key={'option_' + category.name} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input className='relative inline-flex items-center justify-start max-w-full w-full h-8 px-2' 
                    onChange={(event) => updateQuery(event.target.value)}
                    value={searchQuery}
                    placeholder='Search for a product...' />
                    <button className='text-neutral-500 mx-4'
                    onClick={clearQuery}>
                        <GiCancel />
                    </button>
                    <div className='relative flex whitespace-nowrap clear-both text-white bg-violet-500 max-w-[48px]'>
                        <button className='mx-4'
                        onClick={() => searchBarSearch(searchQuery)}>
                            <PiMagnifyingGlassBold />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;