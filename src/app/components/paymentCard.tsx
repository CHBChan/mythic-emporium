import { productType } from "../interface/interface";

interface paymentProps {
    cart: productType[]
}

const PaymentCard : React.FC<paymentProps> = ({ cart }) => {

    const encryptCart = () => {
        let s : string = '';
        cart.map((item, index) => {
            s = s.concat(item.product_quantity.toString() + 'x' + item.product_id.toString());
            if(index != cart.length - 1) {
                s = s.concat('&');
            }
        });
        return s;
    };

    return (
        <>
            <link href="https://fonts.googleapis.com/css2?family=Libre+Barcode+128&display=swap" rel="stylesheet"></link>
            <div className='flex flex-col items-center gap-4 border-t border-solid border-black mt-4 p-4'>
                <span>Scan the follow code with your _placeholder_ to complete the transaction:</span>
                <span className='barcode text-6xl max-w-full'>{encryptCart()}</span>
            </div>
        </>
    );
};

export default PaymentCard;