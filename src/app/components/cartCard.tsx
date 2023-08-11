import { productType } from "../interface/interface";
import { Currency } from "./currency";


interface cartProps {
    cart: productType[],
    updateCartQuantity: (id : number, quantity : number) => void
}

const CartCard : React.FC<cartProps> = ({ cart, updateCartQuantity }) => {
    const quantityRange = [0, 1, 2, 3, 4, 5]

    return (
        <div className='absolute flex flex-col'>
            {cart.map((item) => (
                <div key={'cart_item_' + item.product_id} 
                className='flex flex-col gap-2'>
                    <div className='flex flex-row gap-2'>
                        <span>{item.product_brand}</span>
                        <span className='mr-4'>{item.product_name}</span>
                        <Currency value={item.product_price} />
                    </div>
                    <div className='flex flex-row gap-2'>
                        <select value={item.product_quantity} 
                        onChange={(event) => updateCartQuantity(item.product_id, parseInt(event.target.value))}>
                            {quantityRange.map((n) => (
                                <option key={'quantity_' + n} value={n}>{n}</option>
                            ))}
                        </select>
                    </div>
                </div>
            ))}
            <button className='text-white font-bold bg-violet-500 rounded p-2 mt-4'>
                Check out
            </button>
        </div>
    );
};

export { CartCard };