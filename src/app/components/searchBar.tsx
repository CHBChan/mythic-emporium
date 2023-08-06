"use client"

import { PiMagnifyingGlassBold } from 'react-icons/pi';
import { categories } from '../data/data';

const SearchBar : React.FC = () => {

    return (
        <div className='flex items-center gap-8 my-4'>
            <div className='relative flex justify-start z-[99] mb-0 overflow-hidden border-solid border border-violet-500 rounded'>
                <div className='flex'>
                    <div className='dropdown relative flex items-center'>
                        <select className='relative z-[0] whitespace-nowrap text-violet-500 border-violet-500 border-e px-2 bg-white w-[64] h-full cursor-pointer'>
                            {categories.map((category) => (
                                <option key={'option_' + category.name} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <input className='relative inline-flex items-center justify-start max-w-full w-full h-8 px-2' placeholder='Search for a product...' />
                    <div className='relative flex whitespace-nowrap clear-both text-white bg-violet-500'>
                        <button className='mx-4'>
                            <PiMagnifyingGlassBold />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchBar;