'use client';

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation"
import axios from "axios";
import { Field, Form, Formik } from "formik";

function Signup() {
    const router = useRouter();
    const [user, setUser] = React.useState({
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
        if(user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
            onSignup();
        }
        else {
            setButtonDisabled(true);
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
                console.log('password: ' + values.password);
                setUser({
                    username: values.username,
                    password: values.password
                });
            }}>
            <Form 
                className='flex flex-col gap-4 justify-center text-center border-solid border-2 border-black rounded max-w-[400px] p-4'>
                <h1 className='font-bold'>USER REGISTRATION</h1>
                <label htmlFor='username'>Credentials</label>
                <Field type='text' name='username' />
                <label htmlFor='password'>Passcode</label>
                <Field type='password' name='password' />
                <button type='submit' className='border-solid border-2 border-black rounded'>
                    Sign up
                </button>
                <Link href='/login'>Login Page</Link>
            </Form>
        </Formik>
        </div>
    )
}

export default Signup;