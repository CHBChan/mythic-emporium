'use client';

import React from "react";
import axios from "axios";

import { Label } from "@/components/ui/label";

import Header from "./components/header";
import SignUpForm from "./components/signInForm";
import { accountInfo, filterOpt } from "./interface/interface";
import CategoryNavBar from "./components/categoryNavBar";
import FilterCard from "./components/filterCard";

enum formOpt {
  SignUp,
  LogIn
};

export default function Home() {
  const [userInfo, setUserInfo] = React.useState<accountInfo>({ user_id: null, username: null, isAdmin: null });
  const [formType, setFormType] = React.useState<formOpt>(formOpt.LogIn);
  const [showPopup, setShowPopup] = React.useState(false);
  const [filters, setFilters] = React.useState<filterOpt>({
    category: undefined,
    brand: undefined,
    origin: undefined,
    in_stock: false,
    minPrice: 0,
    maxPrice: 9999,
  });

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

  React.useEffect(() => {
    // Retrieve user info from login cookie
    fetchUserFromCookie();
  },[]);

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
      brand: undefined,
      origin: undefined,
      in_stock: false,
      minPrice: 0,
      maxPrice: 9999
    }));
  };

  const applyFilters = () => {
    
  };
  
  return (
    <>
    <div className='content max-h-full'>
      <Header userInfo={userInfo} signOut={signOut} setPopup={setPopup} />
      <CategoryNavBar updateFilter={updateFilters} />
      <div className='inner_content grid gap-4 p-4'>
        <FilterCard filters={filters} updateFilters={updateFilters} resetFilters={resetFilters} applyFilters={applyFilters} />
        <div className='product_listing'>

        </div>
      </div>
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
