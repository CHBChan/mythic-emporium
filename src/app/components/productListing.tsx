import { productType } from "../interface/interface";
import { RootState } from "../states/store";
import EmptyCard from "./emptyCard";
import ProductCard from "./productCard";

import { useSelector } from "react-redux";

interface productListingProps {
    productsList : productType[],
    productCardPressed : (product? : productType) => void
}

const ProductListing : React.FC<productListingProps> = ({ productCardPressed }) => {

    const displayProductsList = useSelector((state: RootState) => state.productsDirectory.displayProductsList);

    return (
        <section className='product_listing min-h-[144px] w-full'>
            {
              Object.values(displayProductsList).map((product) => (
                <ProductCard key={product.product_id + '_card'} product={product} productCardPressed={productCardPressed} />
              ))
            }
            { // If there are no products
              !displayProductsList &&
              <EmptyCard />
            }
        </section>
    );
};

export default ProductListing;