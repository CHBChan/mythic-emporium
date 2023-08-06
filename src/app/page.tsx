'use client'

import React from "react";
import Link from "next/link";

import Header from "./components/header";
import SignUpForm from "./components/signInForm";
import { accountInfo } from "./interface/interface";
import axios from "axios";
import CategoryNavBar from "./components/categoryNavBar";

enum formOpt {
  SignUp,
  LogIn
};

export default function Home() {
  const [userInfo, setUserInfo] = React.useState<accountInfo>({ user_id: null, username: null, isAdmin: null });
  const [formType, setFormType] = React.useState<formOpt>(formOpt.LogIn);
  const [showPopup, setShowPopup] = React.useState(false);

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
  
  return (
    <>
    <div className='content max-h-full'>
      <Header userInfo={userInfo} signOut={signOut} setPopup={setPopup} />
      <CategoryNavBar />
      <div className='inner_content'>
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
