'use client';

import React from "react";
import axios from "axios";

import { Label } from "@/components/ui/label";
import Paginator from "./components/paginator";

import Header from "./components/header";
import SignUpForm from "./components/signInForm";
import { productType, accountInfo, filterOpt } from "./interface/interface";
import CategoryNavBar from "./components/categoryNavBar";
import FilterCard from "./components/filterCard";
import ProductCard from "./components/productCard";
import EmptyCard from "./components/emptyCard";

enum formOpt {
  SignUp,
  LogIn
};

export default function Home() {
  const [userInfo, setUserInfo] = React.useState<accountInfo>({ user_id: null, username: null, isAdmin: null });
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
  const [brandsList, setBrandsList] = React.useState<string[]>([]);
  const [originsList, setOriginsList] = React.useState<string[]>([]);

  const getUserInfo = (user : accountInfo) => {
    setUserInfo(user);
  };

  const fetchUserFromCookie = async () => {
    try {
      const response = await axios.get("api/users/fetchUser");
      setUserInfo(response.data.userInfo);
    }
    catch(error : any) {
      console.error('Failed to fetch user info from cookie');
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get("api/products/fetchAllProducts");
      setProductsList(response.data.products);
    }
    catch(error : any) {
      console.error('Failed to fetch products');
    }
  };

  const fetchFilteredProducts = async () => {
    try {
      const response = await axios.post("api/products/fetchFilteredProducts", filters);
      setProductsList(response.data.products);
    }
    catch(error : any) {
      console.error('Failed to fetch products');
    }
  };

  const signOut = async () => {
    setUserInfo({
      user_id: null,
      username: null,
      isAdmin: null
    });
    const response = await axios.get("api/users/logout");
  };
  
  const switchForm = () => {
    if(formType == formOpt.LogIn) {
        setFormType(formOpt.SignUp);
    }
    else {
        setFormType(formOpt.LogIn);
    }
  };

  const setPopup = () => {
    setShowPopup((prevState) => !prevState);
    console.log('Showing/hiding popup')
  };

  const populateFilterOpts = () => {
    // Populate brands & origins
    const brands = productsList.reduce((brands, product) => {
      if(!brands.includes(product.product_brand)) {
        brands.push(product.product_brand);
      }
      return brands;
    }, [] as string[]);
    setBrandsList(brands);

    const origins = productsList.reduce((origins, product) => {
      if(!origins.includes(product.product_origin)) {
        origins.push(product.product_origin);
      }
      return origins;
    }, [] as string[]);
    setOriginsList(origins);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  };

  React.useEffect(() => {
    // Retrieve user info from login cookie
    fetchUserFromCookie();

    // Retrieve all products
    fetchAllProducts();
  },[]);

  React.useEffect(() => {
    populateFilterOpts();
  }, [productsList]);

  const updateFilters = (option : string, value : any) => {
    switch(option) {
      case 'category':
        setFilters((prevFilters) => ({
          ...prevFilters,
          category: (value === 'All')? undefined : value
        }));
        break;

      case 'brand':
        setFilters((prevFilters) => ({
          ...prevFilters,
          brand: (value === 'All')? undefined : value
        }));
        break;

      case 'origin':
        setFilters((prevFilters) => ({
          ...prevFilters,
          origin: (value === 'All')? undefined : value
        }));
        break;

      case 'stock':
        setFilters((prevFilters) => ({
          ...prevFilters,
          in_stock: !prevFilters.in_stock
        }));
        break;

      case 'min_price':
        setFilters((prevFilters) => ({
          ...prevFilters,
          minPrice: value
        }));
        break;

      case 'max_price':
        setFilters((prevFilters) => ({
          ...prevFilters,
          maxPrice: value
        }));
        break;

      default:
        console.error('What?');
    }
  };

  const resetFilters = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      brand: 'All',
      origin: 'All',
      in_stock: false,
      minPrice: 0,
      maxPrice: 9999
    }));
  };

  const applyFilters = () => {
    // Retrieve filtered products
    fetchFilteredProducts();

    // Scroll to top of page
    scrollToTop();
  };
  
  return (
    <>
    <div className='content flex flex-col h-screen'>
      <Header userInfo={userInfo} signOut={signOut} setPopup={setPopup} />
      <CategoryNavBar updateFilters={updateFilters} applyFilters={applyFilters} />
      <section className='inner_content flex-grow flex flex-row grow gap-4 p-4'>
        <div className='sticky left-0 top-10 h-screen'>
          <FilterCard brandsList={brandsList} originsList={originsList} filters={filters} updateFilters={updateFilters} resetFilters={resetFilters} applyFilters={applyFilters} />
        </div>
        <div className='flex flex-col items-center w-full'>
          <section className='product_listing flex-grow w-full'>
            {productsList.map((product) => (
              <ProductCard key={product.product_id + '_card'} product={product} />
            ))}
            { // If there are no products
              productsList.length < 1 &&
              <EmptyCard />
            }
          </section>
        </div>
      </section>
    </div>
    { // Show popup
      showPopup &&
      <div className='popup_content z-[200] fixed flex items-center justify-center bg-black/80 w-full h-full top-0 left-0'
      onClick={() => setPopup()}>
        <SignUpForm getUserInfo={getUserInfo} formType={formType} switchForm={switchForm} setPopup={setPopup} />
      </div>
    }
    </>
  )
}
