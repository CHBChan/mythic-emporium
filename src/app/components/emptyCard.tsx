const EmptyCard : React.FC = () => {
    
    return (
        <div className='product_card block'>
            <div className='relative block rounded h-full shadow overflow-hidden'>
                <span>No product found!</span> 
            </div>
        </div>
    )
};

export default EmptyCard;