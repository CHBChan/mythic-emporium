import { GrCircleQuestion } from "react-icons/gr";
import { BsHexagonHalf } from "react-icons/bs";

import { productType } from "../interface/interface";

interface cardProps {
    product: productType,
}

const ProductCard : React.FC<cardProps> = ({ product }) => {
    
    return (
        <div className='product_card block cursor-pointer'>
            <div className='relative block rounded h-full overflow-hidden'>
                <div className='flex flex-row items-center justify-around mx-8 p-3 gap-3 h-full'>
                    <GrCircleQuestion size={72}/>
                    <div className='product_info flex flex-col'>
                        <span>{product.product_name}</span>
                        <span>{product.product_brand}</span>
                        <span>{product.product_origin}</span>
                        <div className='flex items-center gap-1'>
                            <span>{product.product_price}</span>
                            <BsHexagonHalf />
                        </div>
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