interface productType {
    product_id: string,
    product_name: string,
    product_desc: string,
    product_category: string,
    product_brand: string,
    product_origin: string,
    product_price: number,
    product_quantity: number,
    product_image: string | null,
    product_disclaimers: string[],
};

interface productsListType {
    [id: string] : productType;
};

interface categoriesDirectory {
    [id: string] : productType[];
}

interface brandsDirectory {
    [id: string] : productType[];
};

interface originsDirectory {
    [id: string] : productType[];
};

interface accountInfo {
    user_id: number | null,
    username: string | null,
    isAdmin: boolean | null
};

interface filterOpt {
    category: string | undefined,
    brand: string | undefined,
    origin: string | undefined,
    in_stock: boolean,
    minPrice: number,
    maxPrice: number,
}

export type { productType, productsListType, categoriesDirectory, brandsDirectory, originsDirectory, accountInfo, filterOpt }