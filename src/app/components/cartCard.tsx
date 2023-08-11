import React from "react";
import { productType } from "../interface/interface";
import { Currency } from "./currency";
import PaymentCard from "./paymentCard";


interface cartProps {
    cart: productType[],
    updateCartQuantity: (id : number, quantity : number) => void
}

const CartCard : React.FC<cartProps> = ({ cart, updateCartQuantity }) => {
    const [checkOut, setCheckOut] = React.useState<boolean>(false);

    const Checkout = () => {
        setCheckOut((prevState) => !prevState);
    };
    
    const quantityRange : number[] = [];
    // Populate array
    for(let i : number = 0; i < 10; i++) {
        quantityRange.push(i);
    }

    const calcTotal = () => {
        let sum = 0;
        cart.map((item) => {
            sum += (item.product_price * item.product_quantity);
        });
        return sum;
    };

    return (
        <div className='flex flex-col gap-2 items-center border-2 border-solid border-violet-500 rounded-xl p-4 min-w-full'>
            <span className='text-rose-600'>Reminder: We currently do not deliver to worlds 32, 35, 46, 321, and 642 due to immenent collapse.</span>
            {   // If there exists item in cart
                (cart.length > 0)?
                <>
                {cart.map((item, index) => (
                    <div key={'cart_item_' + item.product_id} 
                    className='flex flex-col gap-2 w-[256px]'>
                        <div className='flex flex-row font-bold gap-4'>
                            <span className='text-neutral-500'>{item.product_brand}</span>
                            <span className='mr-4'>{item.product_name}</span>
                            <Currency value={item.product_price} />
                        </div>
                        <div className='flex flex-row font-semibold gap-2'>
                            <select className='pl-2 w-[64px]'value={item.product_quantity} 
                            onChange={(event : any) => updateCartQuantity(item.product_id, parseInt(event.target.value))}>
                                {quantityRange.map((n) => (
                                    <option key={'quantity_' + n} value={n}>{n}</option>
                                ))}
                            </select>
                            <span className='text-rose-500 text-sm cursor-pointer'
                            onClick={() => updateCartQuantity(item.product_id, 0)}>
                                Remove
                            </span>
                        </div>
                        {   // Check if item is the last item in cart
                            !(index == cart.length - 1) &&
                            <hr/>
                        }
                    </div>
                ))}
                <div className='flex flex-row gap-2 font-bold mt-4'>
                    <span>Subtotal: </span>
                    <Currency value={calcTotal()} />
                </div>
                {   // Check if checked out
                    (!checkOut)?
                    <button className='text-white font-bold bg-violet-500 rounded p-2 mt-4'
                    onClick={Checkout}>
                        Checkout code
                    </button>
                    :
                    <PaymentCard cart={cart} />
                }
                </>
                :
                <span>There is no item in the cart</span>
            }
        </div>
    );
};

export { CartCard };