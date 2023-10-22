const EmptyCard : React.FC = () => {
    
    return (
        <div className='product_card block max-h-[240px]'>
            <div className='relative block flex flex-col items-center rounded shadow overflow-hidden h-full'>
                <span className='font-bold mt-4 text-center'>No product found! <br/>(If you have just launched the site, this is due to a cold start. Please give it a bit of time to fetch the products.)</span> 
            </div>
        </div>
    )
};

export default EmptyCard;