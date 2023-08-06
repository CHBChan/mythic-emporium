'use client';

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import { Field, Form, Formik } from "formik";
import { accountInfo } from "../interface/interface";

enum formOpt {
    SignUp,
    LogIn
};

interface formProps {
    getUserInfo: (user : accountInfo) => void,
    formType: formOpt,
    switchForm: () => void,
    setPopup: () => void
};

const SignUpForm : React.FC<formProps> = ({ getUserInfo, formType, switchForm, setPopup }) => {
    const [user, setUser] = React.useState({
        username: '',
        password: ''
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const onSignup = async () => {
        try {
            const response = await axios.post("api/users/signup", user);
            getUserInfo(response.data.userInfo);
            setPopup();
        }
        catch(error : any) {
            console.log("Signup failed: " + error.message);
        }
    }

    const onLogin = async () => {
        try {
            const response = await axios.post("api/users/login", user);
            getUserInfo(response.data.userInfo);
            setPopup();
        }
        catch(error : any) {
            console.log("Login failed", error.message);
        }
    }

    const handleFormClick = (event : any) => {
        event.stopPropagation();
    }

    React.useEffect(() => {
        if(user.password.length > 0 && user.username.length > 0) {
            if(formType == formOpt.LogIn) {
                onLogin();
            }
            else {
                onSignup();
            }
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className='absolute flex flex-col items-center'
        onClick={handleFormClick}>
            {   //  Log in form
                formType == formOpt.LogIn &&
                <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    setUser({
                        username: values.username,
                        password: values.password
                    });
                }}>
                    <Form 
                        className='flex flex-col gap-2 justify-center text-center border-solid border-2 border-violet-500 bg-white rounded-xl overflow-hidden max-w-[400px] p-4'>
                        <h1 className='font-bold text-violet-500'>USER LOG IN</h1>
                        <label className='text-violet-500' htmlFor='username'>Credentials</label>
                        <Field className='border-solid border-2 text-violet-500 border-violet-500 rounded px-2' type='text' name='username' />
                        <label className='text-violet-500' htmlFor='password'>Passcode</label>
                        <Field className='border-solid border-2 text-violet-500 border-violet-500 rounded px-2' type='password' name='password' />
                        <button type='submit' className='border-solid border-2 text-violet-500 border-violet-500 rounded'>
                            Log In
                        </button>
                        <span className='cursor-pointer text-violet-500'
                        onClick={() => switchForm()}>
                            Signup instead
                        </span>
                    </Form>
                </Formik>
            }

            {   // Sign up form
                formType == formOpt.SignUp &&
                <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                onSubmit={(values) => {
                    setUser({
                        username: values.username,
                        password: values.password
                    });
                }}>
                    <Form 
                        className='flex flex-col gap-2 justify-center text-center border-solid border-2 border-violet-500 rounded max-w-[400px] p-4'>
                        <h1 className='font-bold text-violet-500'>USER REGISTRATION</h1>
                        <label className='text-violet-500' htmlFor='username'>Credentials</label>
                        <Field className='border-solid border-2 text-violet-500 border-violet-500 rounded px-2' type='text' name='username' />
                        <label className='text-violet-500' htmlFor='password'>Passcode</label>
                        <Field className='border-solid border-2 text-violet-500 border-violet-500 rounded px-2' type='password' name='password' />
                        <button type='submit' className='border-solid border-2 text-violet-500 border-violet-500 rounded'>
                            Sign up
                        </button>
                        <span className='cursor-pointer text-violet-500'
                        onClick={() => switchForm()}>
                            Login instead
                        </span>
                    </Form>
                </Formik>
            }
        </div>
    )
}

export default SignUpForm;