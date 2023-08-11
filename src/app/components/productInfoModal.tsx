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
        <div className='absolute flex'
        onClick={handleFormClick}>1
            <div className='bg-white flex flex-col gap-2 items-center border-2 border-solid border-violet-500 rounded-xl p-4 min-w-[320px]'>
                <GrCircleQuestion size={128}/>
                <span>{displayProduct!.product_name}</span>
                <span>{displayProduct!.product_brand}</span>
                <span>{displayProduct!.product_origin}</span>
                <span>{displayProduct!.product_desc}</span>
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