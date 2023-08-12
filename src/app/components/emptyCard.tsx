const EmptyCard : React.FC = () => {
    
    return (
        <div className='product_card block max-h-[240px]'>
            <div className='relative block flex flex-col items-center rounded shadow overflow-hidden h-full'>
                <span className='font-bold mt-4'>No product found!</span> 
            </div>
        </div>
    )
};

export default EmptyCard;