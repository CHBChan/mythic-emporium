interface CustomCellRendererProps {
    node: any;
    onClick: (product_id: number) => void;
}

export const ProductEditButton : React.FC<CustomCellRendererProps> = ({ node, onClick }) => {
    
    const handleOnClick = () => {
        const product_id = node.data.product_id;
        onClick(product_id);
    }

    return (
        <span>
            <button className="" onClick={handleOnClick}>
                EDIT
            </button>
        </span>
    )
}