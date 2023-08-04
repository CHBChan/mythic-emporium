'use client'

import React from 'react'
import { Field, Form, Formik } from 'formik'
import axios from 'axios';

enum formTypeOpt {
    AddProduct,
    UpdateProduct,
    RemoveProduct
};

function AddProduct() {
    const [formType, setFormType] = React.useState(formTypeOpt.AddProduct);
    const [fetched, setFetched] = React.useState(false);
    const [submit, setSubmit] = React.useState(false);
    const [product, setProduct] = React.useState({
        product_id: 0,
        product_name: '',
        product_desc: '',
        product_category: '',
        product_brand: '',
        product_origin: '',
        product_price: 0,
        product_quantity: 1
    });

    const updateProductState = (data : any) => {
        setProduct(data);
        console.log('Product state updated');
    };

    const addNewProduct = async () => {
        try {
            console.log('In addNewProduct');
            console.log(product);
            const response = await axios.post("api/products/addProduct", product);
            console.log("Product added successfully", response.data);
        }
        catch(error : any) {
            console.log("Product failed to be added: " + error.message);
        }
    };

    const fetchProduct = async (product_id : number) => {
        try {
            const response = await axios.post("api/products/fetchProduct", { product_id });
            updateProductState(response.data.product);
            setFetched(true);
        }
        catch(error : any) {
            console.log("Product failed to be fetched: " + error.message);
        }
    }

    const updateProduct = async (updatedProduct : any) => {
        try {
            const response = await axios.post("api/products/updateProduct", updatedProduct);
            console.log("Product updated successfully", response.data);
        }
        catch(error : any) {
            console.log("Product failed to update: " + error.message);
        }
    };

    const removeProduct = async (product_id : number) => {
        try {
            const response = await axios.post("api/products/removeProduct", { product_id });
            console.log("Product removed successfully", response.data);
        }
        catch(error : any) {
            console.log("Product failed to be removed: " + error.message);
        }
    }

    React.useEffect(() => {
        console.log('In useEffect');
        if(submit) {
            switch(formType) {
                case formTypeOpt.AddProduct:
                    if(product.product_name.length > 0 && product.product_desc.length > 0) {
                        addNewProduct();
                    }
                    break;

                default:
                    break;
            }
            setSubmit(true);
        }
    }, [product]);

    function changeFormType(type : formTypeOpt) {
        console.log('Changing form type');
        setFormType(type);
        setFetched(false);
    };

    const defaultValues={
        product_id: 0,
        product_name: '',
        product_desc: '',
        product_category: '',
        product_brand: '',
        product_origin: '',
        product_price: 0,
        product_quantity: 1
    };

    return (
        <div className='flex flex-col items-center'>
            <fieldset className='my-2 p-4 text-l font-bold text-center border-solid border-2 border-black rounded'>
                <legend>Select management mode:</legend>

                <select className='text-l p-4' name='formType'>
                    <option value={formTypeOpt.AddProduct} onClick={() => {changeFormType(formTypeOpt.AddProduct)}}>Add Product</option>
                    <option value={formTypeOpt.UpdateProduct} onClick={() => {changeFormType(formTypeOpt.UpdateProduct)}}>Update Product</option>
                    <option value={formTypeOpt.RemoveProduct} onClick={() => {changeFormType(formTypeOpt.RemoveProduct)}}>Remove Product</option>
                </select>
            </fieldset>
            { // Add Product Form
            formType == formTypeOpt.AddProduct &&
            <Formik
                initialValues={defaultValues}
                onSubmit={(values) => {
                    updateProductState({
                        product_id: values.product_id,
                        product_name: values.product_name,
                        product_desc: values.product_desc,
                        product_category: values.product_category,
                        product_brand: values.product_brand,
                        product_origin: values.product_origin,
                        product_price: values.product_price,
                        product_quantity: values.product_quantity
                    });
                    setSubmit(true);
                }}>
                <Form 
                    className='flex flex-col gap-2 justify-center text-center border-solid border-2 border-black rounded max-w-[400px] p-4'>
                    <h1 className='font-bold'>ADD PRODUCT</h1>
                    <label htmlFor='id'>Product ID</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_id' min='0' />
                    <label htmlFor='product'>Product name</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_name' />
                    <label htmlFor='description'>Product description</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' component='textarea' rows='4' name='product_desc' />
                    <label htmlFor='category'>Product category</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_category' />
                    <label htmlFor='brand'>Product brand</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_brand' />
                    <label htmlFor='origin'>Product origin</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_origin' />
                    <label htmlFor='price'>Product price</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_price' min='0' />
                    <label htmlFor='quantity'>Product quantity</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_quantity' min='0' />
                    <button className='p-2 border-solid border-2 border-black rounded' type='submit'>
                        Add product
                    </button>
                </Form>
            </Formik>}
            { // Update Product Form
                formType == formTypeOpt.UpdateProduct &&
                <Formik
                initialValues={{
                    product_id: product.product_id,
                    product_name: product.product_name,
                    product_desc: product.product_desc,
                    product_category: product.product_category,
                    product_brand: product.product_brand,
                    product_origin: product.product_origin,
                    product_price: product.product_price,
                    product_quantity: product.product_quantity
                }}
                onSubmit={(values) => {
                    console.log('submit');
                    if(!fetched) {
                        fetchProduct(values.product_id);
                        setSubmit(true);
                    }
                    else {
                        updateProduct(values);
                        setFetched(false);
                    }
                }}
                enableReinitialize={true}>
                    {({ setFieldValue }) => (
                        <Form className='flex flex-col gap-2 justify-center text-center border-solid border-2 border-black rounded max-w-[400px] p-4'>
                            <h1 className='font-bold'>UPDATE PRODUCT</h1>
                            <label htmlFor='id'>Product ID</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_id' min='0'
                            onChange={(event : any) => {
                                const newFetchId = event.target.value;
                                setFieldValue('product_id', newFetchId);
                                setFetched(false); 
                            }}/>

                            { !fetched &&
                            <button className='p-2 border-solid border-2 border-black rounded' type='submit'>
                                Fetch product
                            </button>}

                            { fetched && 
                            <>
                            <label htmlFor='product'>Product name</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_name' />
                            <label htmlFor='description'>Production description</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' component='textarea' rows='4' name='product_desc' />
                            <label htmlFor='category'>Product category</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_category' />
                            <label htmlFor='brand'>Product brand</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_brand' />
                            <label htmlFor='origin'>Production origin</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_origin' />
                            <label htmlFor='price'>Product price</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_price' min='0' />
                            <label htmlFor='quantity'>Product quantity</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_quantity' min='0' />
                            <button className='p-2 border-solid border-2 border-black rounded' type='submit'>
                                Update product
                            </button>
                            </>}
                        </Form>
                    )}
            </Formik>}

            { // Remove Product Form
                formType == formTypeOpt.RemoveProduct &&
                <Formik
                initialValues={{
                    product_id: product.product_id,
                    product_name: product.product_name
                }}
                onSubmit={(values) => {
                    if(!fetched) {
                        fetchProduct(values.product_id);
                        setSubmit(true);
                    }
                    else {
                        removeProduct(values.product_id);
                        setFetched(false);
                    }
                }}
                enableReinitialize={true}>
                    {({ setFieldValue }) => (
                        <Form className='flex flex-col gap-2 justify-center text-center border-solid border-2 border-black rounded max-w-[400px] p-4'>
                            <h1 className='font-bold'>REMOVE PRODUCT</h1>
                            <label htmlFor='id'>Product ID</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_id' min='0' 
                            onChange={(event : any) => {
                                const newFetchId = event.target.value;
                                setFieldValue('product_id', newFetchId);
                                setFetched(false);
                            }} />
        
                            { !fetched && 
                            <button className='p-2 border-solid border-2 border-black rounded' type='submit' >
                                Fetch product
                            </button>
                            }
        
                            { fetched &&
                            <>
                            <label htmlFor='product'>Product name</label>
                            <Field className='p-2 border-solid border-2 border-black rounded bg-slate-300' type='text' name='product_name' disabled={true}/>
                            <button className='p-2 border-solid border-2 border-black rounded' type='submit'>
                                Remove product
                            </button>
                            </>
                            }
                        </Form>
                    )}
            </Formik>}
        </div>
    )
}

export default AddProduct