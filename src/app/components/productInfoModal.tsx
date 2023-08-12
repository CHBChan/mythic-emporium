'use client';

import React from "react";
import { productType } from "../interface/interface";

import { GrCircleQuestion } from "react-icons/gr";
import { Currency } from "./currency";

interface modalProps {
    displayProduct: productType | undefined,
    addToCart: (product : productType) => void
};

const ProductInfoModal : React.FC<modalProps> = ({ displayProduct, addToCart }) => {
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const handleFormClick = (event : any) => {
        event.stopPropagation();
    };

    return (
        <div className='flex min-w-[360px] sm:w-2/4'
        onClick={handleFormClick}>1
            <div className='bg-white flex flex-col gap-2 items-center border-2 border-solid border-violet-500 rounded-xl p-4'>
                <GrCircleQuestion size={128}/>
                <span className='font-bold'>{displayProduct!.product_name}</span>
                <span className='text-neutral-500 text-sm italic'>{displayProduct!.product_brand}</span>
                <span className='text-neutral-500 text-sm'>{displayProduct!.product_origin}</span>
                <span className='text-center'>{displayProduct!.product_desc}</span>
                <Currency value={displayProduct!.product_price} />
                {   // Check if item is in stock
                    (displayProduct!.product_quantity > 0)?
                    <button className='text-white font-bold bg-violet-500 rounded p-2'
                    onClick={() => addToCart(displayProduct!)}>
                        Add to cart
                    </button>
                    :
                    <span className='text-rose-500 font-bold'>Out of stock</span>
                }
            </div>
        </div>
    )
}

export default ProductInfoModal;