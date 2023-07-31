'use client'

import React from 'react'
import { Field, Form, Formik } from 'formik'

const addProduct = () => {
  return (
    <div className='flex flex-col items-center'>
        <Formik
            initialValues={{
                product: '',
                quantity: 1,
                description: ''
            }}
            onSubmit={(values) => {
                console.log(values);
            }}>
            <Form 
                className='flex flex-col gap-4 justify-center text-center border-solid border-2 border-black rounded max-w-[400px] p-4'>
                <h1 className='font-bold'>ADD PRODUCT</h1>
                <Field type='text' name='product' />
                <Field type='number' name='quantity' />
                <Field type='text' name='description' />
                <button type='submit'>
                    Add product
                </button>
            </Form>
        </Formik>
    </div>
  )
}

export default addProduct