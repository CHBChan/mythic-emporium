'use client';

import React, { Children } from "react";
import { productType } from "../interface/interface";

import { Toast } from 'primereact/toast';

import { GrCircleQuestion } from "react-icons/gr";
import { Currency } from "./currency";

import 'primereact/resources/themes/lara-light-indigo/theme.css';

interface modalProps {
    displayProduct: productType | undefined,
    addToCart: (product : productType) => void
};

const ProductInfoModal : React.FC<modalProps> = ({ displayProduct, addToCart }) => {
    const toast = React.useRef<any>(null);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const handleFormClick = (event : any) => {
        event.stopPropagation();
    };

    const showToast = (product : productType) => {
        toast.current.show({ 
            severity: 'success',
            summary: `${product.product_name + ' has been added to the cart'}`,
            life: 3000
        });
    };

    return (
        <>
        <div className='flex min-w-[360px] sm:w-2/4'
        onClick={handleFormClick}>1
            <div className='bg-white flex flex-col gap-2 items-center border-2 border-solid border-violet-500 rounded-xl p-4 w-full'>
                <GrCircleQuestion size={128}/>
                <span className='font-bold'>{displayProduct!.product_name}</span>
                <span className='text-neutral-500 text-sm italic'>{displayProduct!.product_brand}</span>
                <span className='text-neutral-500 text-sm'>{displayProduct!.product_origin}</span>
                <span className='text-center'>{displayProduct!.product_desc}</span>
                <Currency value={displayProduct!.product_price} />
                {   // Check if item is in stock
                    (displayProduct!.product_quantity > 0)?
                    <button className='text-white font-bold bg-violet-500 rounded p-2'
                    onClick={() => {
                        addToCart(displayProduct!);
                        showToast(displayProduct!);
                    }}>
                        Add to cart
                    </button>
                    :
                    <span className='text-rose-500 font-bold'>Out of stock</span>
                }
            </div>
        </div>
        <Toast className='fixed flex flex-row items-center top-0 right-0' ref={toast} />
        </>
    )
}

export default ProductInfoModal;