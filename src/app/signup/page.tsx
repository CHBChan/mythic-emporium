'use client';

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import { Field, Formik } from "formik";

function Signup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: '',
        password: '',
        username: '',
    });
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const onSignup = async () => {
        try {
            const response = await axios.post("api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
        }
        catch(error : any) {
            console.log("Signup failed: " + error.message);
        }
    }

    React.useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user])

    return (
        <div className='flex flex-col items-center'>
            <Formik
            initialValues={{
                email: '',
                username: '',
                password: ''
            }}
            onSubmit={(values, {setSubmitting}) => {
                console.log(values);
            }}>
            <form 
                className='flex flex-col gap-4 justify-center text-center border-solid border-2 border-black rounded max-w-[400px] p-4'>
                <h1 className='font-bold'>USER REGISTRATION</h1>
                <Field type='text' name='email' />
                <Field type='text' name='username' />
                <Field type='text' name='password' />
                <button type='submit' className='border-solid border-2 border-black'>
                    Sign up
                </button>
                <Link href='/login'>Login Page</Link>
            </form>
        </Formik>
        </div>
    )
}

export default Signup;