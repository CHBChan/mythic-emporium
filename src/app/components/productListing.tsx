import { productType } from "../interface/interface";
import EmptyCard from "./emptyCard";
import ProductCard from "./productCard";

interface productListingProps {
    productsList : productType[],
    productCardPressed : (product? : productType) => void
}

const ProductListing : React.FC<productListingProps> = ({ productsList, productCardPressed }) => {

    return (
        <section className='product_listing flex-grow w-full'>
            {productsList.map((product) => (
              <ProductCard key={product.product_id + '_card'} product={product} productCardPressed={productCardPressed} />
            ))}
            { // If there are no products
              productsList.length < 1 &&
              <EmptyCard />
            }
        </section>
    );
};

export default ProductListing;