import { GrCircleQuestion } from "react-icons/gr";
import { BsHexagonHalf } from "react-icons/bs";

import { productType } from "../interface/interface";

interface cardProps {
    product: productType,
}

const ProductCard : React.FC<cardProps> = ({ product }) => {
    
    return (
        <div className='block'>
            <div className='relative block rounded h-full shadow overflow-hidden hover:shadow-2xl'>
                <div className='flex flex-row items-center justify-around p-3 gap-3 h-full'>
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