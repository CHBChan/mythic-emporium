"use client";

import React, { Children } from "react";
import { productType } from "../interface/interface";

import { Toast } from "primereact/toast";

import { GrCircleQuestion } from "react-icons/gr";
import { Currency } from "./currency";

import "primereact/resources/themes/lara-light-indigo/theme.css";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { addProductToCart } from "../states/cartReducer";
import { RootState } from "../states/store";

interface modalProps {
  displayProduct: productType | undefined;
}

const ProductInfoModal: React.FC<modalProps> = ({
  displayProduct,
}) => {
  const toast = React.useRef<any>(null);

  const handleFormClick = (event: any) => {
    event.stopPropagation();
  };

  const showToast = (product: productType) => {
    toast.current.show({
      severity: "success",
      summary: `${numCheckoutItems + " " + product.product_name + " has been added to the cart"}`,
      life: 3000,
    });
  };

  const productsList = useSelector((state: RootState) => state.productsDirectory.productsList);
  const cart = useSelector((state: RootState) => state.cart.productsInCart);

  const [numCheckoutItems, setNumCheckoutItems] = React.useState<number>(1);

  const stockInCart = cart[displayProduct!.product_id] ? cart[displayProduct!.product_id].product_quantity : 0;
  const maxCheckoutItems: number = Math.min(20, productsList[displayProduct!.product_id].product_quantity - stockInCart);

  const handleUpdateNumCheckoutItems = (event : React.ChangeEvent<HTMLSelectElement>) => {
    setNumCheckoutItems(Number(event.target.value));
  };

  const dispatch = useDispatch();

  return (
    <>
      <div className="flex min-w-[360px] sm:w-2/4" onClick={handleFormClick}>
        <div className="bg-white flex flex-col gap-2 items-center border-2 border-solid border-violet-500 rounded-xl p-4 w-full">
          <GrCircleQuestion size={128} />
          <span className="font-bold">{displayProduct!.product_name}</span>
          <span className="text-neutral-500 text-sm italic">
            {displayProduct!.product_brand}
          </span>
          <span className="text-neutral-500 text-sm">
            {displayProduct!.product_origin}
          </span>
          <span className="text-center">{displayProduct!.product_desc}</span>
          <div className="flex flex-row gap-2">
            {displayProduct!.product_quantity > 0 ? (
              <>
                <div className="text-green-700">
                  {displayProduct!.product_quantity - stockInCart} available at
                </div>
                <Currency value={displayProduct!.product_price} />
                <div className="text-green-700">each</div>
              </>
            ) : (
              <Currency value={displayProduct!.product_price} />
            )}
          </div>

          {
            // Check if item is in stock
            (displayProduct!.product_quantity - stockInCart > 0) ? (
              <>
                <div className="flex flex-row gap-2">
                  <select
                    className="text-l p-4 cursor-pointer"
                    name="amount"
                    onChange={handleUpdateNumCheckoutItems}
                    value={numCheckoutItems}
                  >
                    {Array.from(
                      {
                        length:
                          displayProduct!.product_quantity > maxCheckoutItems
                            ? maxCheckoutItems
                            : displayProduct!.product_quantity,
                      },
                      (v, i) => i
                    ).map((i: number) => (
                      <option key={i+1 + '_option'} value={i+1}>{i+1}</option>
                    ))}
                  </select>
                  <button
                    className="text-white font-bold bg-violet-500 rounded p-2"
                    onClick={() => {
                      const checkoutProduct : productType = {...displayProduct!, product_quantity: Math.min(numCheckoutItems, displayProduct!.product_quantity - stockInCart)};
                      dispatch(addProductToCart(checkoutProduct));
                      showToast(displayProduct!);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </>
            ) : (
              <span className="text-rose-500 font-bold">Out of stock</span>
            )
          }
        </div>
      </div>
      <Toast
        className="fixed flex flex-row items-center top-0 right-0"
        ref={toast}
      />
    </>
  );
};

export default ProductInfoModal;
