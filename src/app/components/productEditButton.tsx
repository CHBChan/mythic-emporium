interface CustomCellRendererProps {
    node: any;
    onClick: (product_id: number) => void;
}

export const ProductEditButton : React.FC<CustomCellRendererProps> = ({ node, onClick }) => {
    
    const handleOnClick = () => {
        const product = node.data;
        onClick(product);
    }

    return (
        <span>
            <button className="" onClick={handleOnClick}>
                EDIT
            </button>
        </span>
    )
}