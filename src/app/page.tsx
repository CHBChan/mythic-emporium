'use client'

import React from "react";
import Link from "next/link";
import Header from "./components/header";
import SignUpForm from "./components/signInForm";

enum formOpt {
  SignUp,
  LogIn
};

export default function Home() {
  const [formType, setFormType] = React.useState<formOpt>(formOpt.LogIn);
  const [showPopup, setShowPopup] = React.useState(false);

  const switchForm = () => {
    if(formType == formOpt.LogIn) {
        setFormType(formOpt.SignUp);
    }
    else {
        setFormType(formOpt.LogIn);
    }
  }

  const setPopup = () => {
    setShowPopup((prevState) => !prevState);
    console.log('Showing/hiding popup')
  };
  
  return (
    <>
    <div className='content max-h-full'>
      <Header setPopup={setPopup} />
      <div className='inner_content'>
      </div>
    </div>
    { // Show popup
      showPopup &&
      <div className='popup_content z-[200] fixed flex items-center justify-center bg-black/80 w-full h-full top-0 left-0'
      onClick={() => setPopup()}>
        <SignUpForm formType={formType} switchForm={switchForm} />
      </div>
    }
    </>
  )
}
