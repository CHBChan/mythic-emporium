"use client"

import * as React from 'react';
import { categories } from '../data/data';
import { useDispatch } from 'react-redux';
import { setCategory } from '../states/filterReducer';

interface navBarProps {
    applyFilters: (type : string) => void
}

const CategoryNavBar : React.FC<navBarProps> = ({ applyFilters }) => {
    const [changeCategory, setChangeCategory] = React.useState<boolean>(false);
    
    const dispatch = useDispatch();

    const handlePress = (category : string) => {
        dispatch(setCategory(category));
        setChangeCategory(true);
    };

    React.useEffect(() => {
        if(changeCategory) {
            applyFilters('fetch');
            setChangeCategory(false);
        }
    }, [changeCategory]);

    return (
        <section className='nav_section relative z-[100] block'>
            <nav className='relative flex items-stretch bg-violet-500 min-h-[64px]'>
                <div className='nav_menu flex items-stretch grow px-4'>
                    <div className='nav_start flex items-stretch justify-start mr-auto'>
                        {categories.map((category) => (
                            <div key={category.name + '_menu'} className='relative flex items-stretch grow-0 shrink-0 p-0 my-1 rounded border-2 border-violet-500 hover:border-white'>
                                <span className='flex items-center  gap-2 font-bold text-white cursor-pointer px-4'
                                onClick={() => handlePress(category.name)}>
                                    {category.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </nav>
        </section>
    )
};

export default CategoryNavBar;