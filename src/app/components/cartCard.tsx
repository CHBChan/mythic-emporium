import React from "react";
import { productType } from "../interface/interface";
import { Currency } from "./currency";
import PaymentCard from "./paymentCard";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../states/store";

import { updateProductInCart, removeFromCart} from "../states/cartReducer";


const CartCard : React.FC = () => {
    const [checkOut, setCheckOut] = React.useState<boolean>(false);

    const Checkout = () => {
        setCheckOut((prevState) => !prevState);
    };

    const calcTotal = (cart: productType[]) => {
        let sum = 0;
        cart.map((item) => {
            sum += (item.product_price * item.product_quantity);
        });
        return sum;
    };

    const dispatch = useDispatch();
    const cart = useSelector((state: RootState) => state.cart.productCart);

    return (
        <div className='flex flex-col gap-2 items-center border-2 border-solid border-violet-500 rounded-xl p-4 min-w-full'>
            <span className='text-rose-600'>Reminder: We currently do not deliver to worlds 32, 35, 46, 321, and 642 due to imminent collapse.</span>
            {   // If there exists item in cart
                (cart.length > 0)?
                <>
                {cart.map((item, index) => (
                    <div key={'cart_item_' + item.product_id} 
                    className='flex flex-col gap-2 w-[256px] md:w-1/4'>
                        <div className='flex flex-row justify-between font-bold'>
                            <div className='flex flex-row gap-8'>
                                <span className='text-neutral-500 italic'>{item.product_brand}</span>
                                <span className='mr-4'>{item.product_name}</span>
                            </div>
                            <Currency value={item.product_price} />
                        </div>
                        <div className='flex flex-row font-semibold gap-8'>
                            <select className='pl-2 w-[64px]'value={item.product_quantity} 
                            onChange={(event : any) => {
                                dispatch(updateProductInCart({product_id: item.product_id, product_quantity: parseInt(event.target.value)}));
                                }}>
                                {Array.from({ length: item.product_quantity + 1 }, (v, i) => i).map((n) => (
                                    <option key={'quantity_' + n} value={n}>{n}</option>
                                ))}
                            </select>
                            <span className='text-rose-500 hover:text-rose-700 text-sm cursor-pointer'
                            onClick={() => {
                                dispatch(removeFromCart(item.product_id));
                                }}>
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
                    <Currency value={calcTotal(cart)} />
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