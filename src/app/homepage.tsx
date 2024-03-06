"use client";

import React from "react";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./states/store";

import Header from "./components/header";
import SignUpForm from "./components/signInForm";
import {
  productType,
  accountInfo,
  filterOpt,
  brandsDirectory,
  originsDirectory,
  productsListType,
} from "./interface/interface";
import CategoryNavBar from "./components/categoryNavBar";
import FilterCard from "./components/filterCard";
import ProductInfoModal from "./components/productInfoModal";
import ProductListing from "./components/productListing";
import { CartCard } from "./components/cartCard";

import { useDispatch } from "react-redux";
import { setProductsDirectory } from "../app/states/productsListReducer";
import { productsDirectoryType } from "../app/states/productsListReducer";

enum formOpt {
  SignUp,
  LogIn,
}

export default function Homepage() {
  const [userInfo, setUserInfo] = React.useState<accountInfo>({
    user_id: null,
    username: null,
    isAdmin: null,
  });
  const [formType, setFormType] = React.useState<formOpt>(formOpt.LogIn);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);
  const [filters, setFilters] = React.useState<filterOpt>({
    category: undefined,
    brand: undefined,
    origin: undefined,
    in_stock: false,
    minPrice: 0,
    maxPrice: 9999,
  });
  const [productsList, setProductsList] = React.useState<productType[]>([]);
  const [displayedList, setDisplayedList] = React.useState<productType[]>([]);
  const [brandsList, setBrandsList] = React.useState<string[]>([]);
  const [originsList, setOriginsList] = React.useState<string[]>([]);

  const [showProductInfo, setShowProductInfo] = React.useState<boolean>(false);
  const [displayProduct, setDisplayProduct] = React.useState<productType>({
    product_id: -1,
    product_name: "What?",
    product_desc: "Product information failed to be fetched..?",
    product_category: "General",
    product_brand: "Unknown",
    product_origin: "Unknown",
    product_price: -1,
    product_quantity: -1,
  });

  const [cartOpen, setCartOpen] = React.useState<boolean>(false);

  const [filterOpen, setFilterOpen] = React.useState<boolean>(false);

  const dispatch = useDispatch();

  const getUserInfo = (user: accountInfo) => {
    setUserInfo(user);
  };

  const fetchUserFromCookie = async () => {
    try {
      const response = await axios.get("api/users/fetchUser");
      setUserInfo(response.data.userInfo);
    } catch (error: any) {
      console.error("Failed to fetch user info from cookie");
    }
  };

  const fetchAllProducts = async () => {
    try {
      // Have to use axios.post() to bypass Vercel caching
      const timestamp = Date.now();
      const response = await axios.post("api/products/fetchAllProducts", {
        time: timestamp,
      });
      setProductsList(response.data.products);
    } catch (error: any) {
      console.error("Failed to fetch products: ", error.message);
    }
  };

  const fetchAllProductsPeriodically = async () => {
    try {
      // Have to use axios.post() to bypass Vercel caching
      const response = await axios.post("api/products/fetchAllProducts");
      const products = response.data.products;
      if (products.length === 0) {
        // Retry fetch if no products were fetched
        setTimeout(fetchAllProductsPeriodically, 2000);
      } else {
        console.log("Periodically fetching products...");
        let updatedProductsDirectory = {} as productsDirectoryType;
        let updatedProductsList = {} as productsListType;
        let updatedBrandsList = {} as brandsDirectory;
        let updatedOriginsList = {} as originsDirectory;

        products.forEach((product: productType) => {
          //adds product to list
          updatedProductsList[product.product_id] = product;
          //check if product.brand is in list, if not add
          updatedBrandsList[product.product_brand] ??= [];
          updatedBrandsList[product.product_brand].push(product);
          //check if product.origin is in list, if not add
          updatedOriginsList[product.product_origin] ??= [];
          updatedOriginsList[product.product_origin].push(product);
        });
        updatedProductsDirectory.productsList = updatedProductsList;
        updatedProductsDirectory.brandsList = updatedBrandsList;
        updatedProductsDirectory.originsList = updatedOriginsList;

        dispatch(setProductsDirectory(updatedProductsDirectory));

        {
          /* setProductsList(products); */
        }
      }
    } catch (error: any) {
      console.error("Failed to fetch products: ", error.message);
      // Retry fetch if fetching failed
      setTimeout(fetchAllProductsPeriodically, 2000);
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.post("api/products/fetchFilteredProducts", {
        category: filters.category == "All" ? undefined : filters.category,
        brand: filters.category == "All" ? undefined : filters.brand,
        origin: filters.category == "All" ? undefined : filters.origin,
        in_stock: filters.in_stock,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      });
      setProductsList(response.data.products);
    } catch (error: any) {
      console.error("Failed to fetch products");
    }
  };

  const filterProducts = () => {
    const filteredProducts = productsList.filter((product) => {
      let passes = true;

      if (
        (filters.category &&
          filters.category != "All" &&
          filters.category !== product.product_category) ||
        (filters.brand &&
          filters.brand != "All" &&
          filters.brand !== product.product_brand) ||
        (filters.origin &&
          filters.origin != "All" &&
          filters.origin !== product.product_origin) ||
        (filters.in_stock && product.product_quantity < 1) ||
        filters.minPrice > product.product_price ||
        filters.maxPrice < product.product_price
      ) {
        passes = false;
      }

      return passes;
    });

    return filteredProducts;
  };

  const signOut = async () => {
    setUserInfo({
      user_id: null,
      username: null,
      isAdmin: null,
    });
    const response = await axios.get("api/users/logout");
  };

  const switchForm = () => {
    if (formType == formOpt.LogIn) {
      setFormType(formOpt.SignUp);
    } else {
      setFormType(formOpt.LogIn);
    }
  };

  const setPopup = () => {
    setShowPopup((prevState) => !prevState);
  };

  const productCardPressed = (product?: productType) => {
    // Set displayed product information
    if (product) {
      setDisplayProduct(product);
    }

    // Show / hide product information modal
    setShowProductInfo((prevState) => !prevState);
  };

  const toggleCart = () => {
    setCartOpen((prevState) => !prevState);
  };

  const closeCart = () => {
    setCartOpen(false);
  };

  const populateFilterOpts = () => {
    // Populate brands & origins
    const brands = productsList.reduce((brands, product) => {
      if (!brands.includes(product.product_brand)) {
        brands.push(product.product_brand);
      }
      return brands;
    }, [] as string[]);
    setBrandsList(brands);

    const origins = productsList.reduce((origins, product) => {
      if (!origins.includes(product.product_origin)) {
        origins.push(product.product_origin);
      }
      return origins;
    }, [] as string[]);
    setOriginsList(origins);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    // Retrieve user info from login cookie
    fetchUserFromCookie();

    // Retrieve all products
    fetchAllProductsPeriodically();
  }, []);

  React.useEffect(() => {
    populateFilterOpts();

    // Display all products
    setDisplayedList(productsList);
  }, [productsList]);

  React.useEffect(() => {
    // Close cart
    closeCart();
  }, displayedList);

  const updateFilters = (option: string, value: any) => {
    // Update filter options
    switch (option) {
      case "category":
        setFilters((prevFilters) => ({
          ...prevFilters,
          category: value,
        }));
        break;

      case "brand":
        setFilters((prevFilters) => ({
          ...prevFilters,
          brand: value,
        }));
        break;

      case "origin":
        setFilters((prevFilters) => ({
          ...prevFilters,
          origin: value,
        }));
        break;

      case "stock":
        setFilters((prevFilters) => ({
          ...prevFilters,
          in_stock: !prevFilters.in_stock,
        }));
        break;

      case "min_price":
        setFilters((prevFilters) => ({
          ...prevFilters,
          minPrice: value,
        }));
        break;

      case "max_price":
        setFilters((prevFilters) => ({
          ...prevFilters,
          maxPrice: value,
        }));
        break;

      default:
        console.error("What?");
    }
  };

  const resetFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: "All",
      origin: "All",
      in_stock: false,
      minPrice: 0,
      maxPrice: 9999,
    }));
    // Work around solution for reset filters not updating in time due to async nature of state management
    setDisplayedList(productsList);
  };

  const applyFilters = (type: string) => {
    // Retrieve filtered products
    let filteredProducts = productsList;
    switch (type) {
      case "display":
        filteredProducts = filterProducts();
        setDisplayedList(filteredProducts);
        break;

      case "fetch":
        fetchFilteredProducts();
        setDisplayedList(productsList);
        break;
    }

    // Scroll to top of page
    scrollToTop();

    // Hide filters if using mobile device
    if (window.innerWidth <= 480) {
      setFilterOpen(false);
    }
  };

  const searchBarSearch = async (query: string) => {
    try {
      const response = await axios.post("api/products/fetchProductsByQuery", {
        searchQuery: query,
      });
      setProductsList(response.data.products);
    } catch (error: any) {
      console.error(
        "Failed to fetch products from search query",
        error.message
      );
    }
  };

  const toggleFilter = () => {
    setFilterOpen((prevState) => !prevState);
  };

  return (
    <>
    <div className="content flex flex-col select-none h-screen">
        <Header
        userInfo={userInfo}
        signOut={signOut}
        setPopup={setPopup}
        toggleCart={toggleCart}
        searchBarSearch={searchBarSearch}
        updateFilters={updateFilters}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        />
        <CategoryNavBar
        updateFilters={updateFilters}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
        />
        <section className="inner_content flex-grow flex flex-row grow gap-4 p-4">
        {
            // Check if cart is close
            !cartOpen ? (
            <>
                <div
                className={`filters_container ${filterOpen ? "open" : ""}`}
                >
                <FilterCard
                    brandsList={brandsList}
                    originsList={originsList}
                    filters={filters}
                    updateFilters={updateFilters}
                    resetFilters={resetFilters}
                    applyFilters={applyFilters}
                    toggleFilter={toggleFilter}
                />
                </div>
                <button
                className="filters_button absolute hidden z-[500] text-violet-500 text-2xl border-2 border-solid border-violet-500 rounded h-[32px] w-[32px]"
                onClick={() => toggleFilter()}
                >
                &equiv;
                </button>
                <div className="flex flex-col items-center w-full">
                <ProductListing
                    productsList={displayedList}
                    productCardPressed={productCardPressed}
                />
                </div>
            </>
            ) : (
            <CartCard />
            )
        }
        </section>
    </div>
    {
        // Show popup
        showPopup && (
        <div
            className="popup_content z-[1000] fixed flex items-center justify-center bg-black/80 w-full h-full top-0 left-0"
            onClick={() => setPopup()}
        >
            <SignUpForm
            getUserInfo={getUserInfo}
            formType={formType}
            switchForm={switchForm}
            setPopup={setPopup}
            />
        </div>
        )
    }
    {
        // Show product information
        showProductInfo && (
        <div
            className="popup_content z-[1000] fixed flex items-center justify-center bg-black/80 w-full h-full top-0 left-0"
            onClick={() => productCardPressed()}
        >
            <ProductInfoModal displayProduct={displayProduct} />
        </div>
        )
    }
    </>
  );
}