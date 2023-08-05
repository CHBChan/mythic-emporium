'use client';

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import { Field, Form, Formik } from "formik";

function Login() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        password: '',
        username: '',
    })

    const onLogin = async () => {
        try {
            const response = await axios.post("api/users/login", user);
            router.push('/InventoryManagement');
        }
        catch(error : any) {
            console.log("Login failed", error.message);
        }
    }

    React.useEffect(() => {
        if(user.password.length > 0 && user.username.length > 0) {
            onLogin();
        }
    }, [user])

    return (
        <div className='flex flex-col items-center'>
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
                className='flex flex-col gap-4 justify-center text-center border-solid border-2 border-black rounded max-w-[400px] p-4'>
                <h1 className='font-bold'>USER LOG IN</h1>
                <Field type='text' name='username' />
                <Field type='password' name='password' />
                <button type='submit' className='border-solid border-2 border-black'>
                    Log In
                </button>
                <Link href='/signup'>Signup Page</Link>
            </Form>
        </Formik>
        </div>
    )
}

export default Login;