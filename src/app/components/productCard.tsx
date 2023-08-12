import { GrCircleQuestion } from "react-icons/gr";

import { productType } from "../interface/interface";
import { Currency } from "./currency";

interface cardProps {
    product: productType,
    productCardPressed: (product: productType) => void
}

const ProductCard : React.FC<cardProps> = ({ product, productCardPressed }) => {
    
    return (
        <div className='product_card block cursor-pointer'
        onClick={() => productCardPressed(product)}>
            <div className='relative block rounded h-full overflow-hidden'>
                <div className='flex flex-row items-center justify-around mx-8 p-3 gap-3 h-full'>
                    <GrCircleQuestion size={72}/>
                    <div className='product_info flex flex-col'>
                        <span className='font-bold'>{product.product_name}</span>
                        <span className='text-neutral-500 text-sm'>{product.product_brand}</span>
                        <span className='text-neutral-500 text-sm mb-2'>{product.product_origin}</span>
                        <Currency value={product.product_price} />
                        {   // Check availability
                            (product.product_quantity > 0)?
                            <span className='text-green-700'>In Stock</span>
                            :
                            <span className='text-rose-700'>Out of Stock</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;