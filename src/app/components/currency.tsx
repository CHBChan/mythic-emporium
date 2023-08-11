import { BsHexagonHalf } from "react-icons/bs";

interface currencyProps {
    value: number
}


const Currency : React.FC<currencyProps> = ({ value }) => {

    return (
        <div className='flex items-center gap-1'>
            <span>{value}</span>
            <BsHexagonHalf />
        </div>
    );
};

export { Currency };