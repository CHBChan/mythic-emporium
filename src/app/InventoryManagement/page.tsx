'use client'

import React from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';
import { Field, Form, Formik, setIn } from 'formik'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

import { productType } from '../interface/interface';

import 'primereact/resources/themes/lara-light-indigo/theme.css';
import { useRouter } from 'next/navigation';

enum modeOpt {
    AddProduct = "0",
    UpdateProduct = "1",
    RemoveProduct = "2",
    ViewInventory = "3"
};

function InventoryManagement() {
    const router = useRouter();
    
    const [mode, setMode] = React.useState(modeOpt.AddProduct);
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
    const [inventory, setInventory] = React.useState<productType[]>([]);

    async function adminVerification() {
        try {
            const response = await axios.get("api/users/roleVerification");
        }
        catch(error : any) {
            console.error("Verification process failed: " + error.message);
            router.push('/');
        }
    }

    const updateProductState = (data : any) => {
        setProduct(data);
    };

    const addNewProduct = async () => {
        try {
            const response = await axios.post("api/products/addProduct", product);
        }
        catch(error : any) {
            console.error("Product failed to be added: " + error.message);
        }
    };

    const fetchProduct = async (product_id : number) => {
        try {
            const response = await axios.post("api/products/fetchProduct", { product_id });
            updateProductState(response.data.product);
            setFetched(true);
        }
        catch(error : any) {
            console.error("Product failed to be fetched: " + error.message);
        }
    }

    const fetchAllProduct = async () => {
        try {
            // Have to use axios.post() to bypass Vercel caching
            const timestamp = Date.now();
            const response = await axios.post('api/products/fetchAllProducts', {
                time: timestamp,
            });
            setInventory(response.data.products);
        }
        catch(error : any) {
            console.error("Inventory failed to be fetched: "  + error.message);
        }
    }

    const updateProduct = async (updatedProduct : any) => {
        try {
            const response = await axios.post("api/products/updateProduct", updatedProduct);
        }
        catch(error : any) {
            console.error("Product failed to update: " + error.message);
        }
    };

    const removeProduct = async (product_id : number) => {
        try {
            const response = await axios.post("api/products/removeProduct", { product_id });
        }
        catch(error : any) {
            console.error("Product failed to be removed: " + error.message);
        }
    }

    React.useEffect(() => {
        adminVerification();

        if(submit) {
            switch(mode) {
                case modeOpt.AddProduct:
                    if(product.product_name.length > 0 && product.product_desc.length > 0) {
                        addNewProduct();
                    }
                    break;

                default:
                    break;
            }
            setSubmit(false);
        }
    }, [product]);

    const changeMode = (event : React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);
        let type : modeOpt = event.target.value as modeOpt;
        setMode(type);

        if(type === modeOpt.ViewInventory) {
            fetchAllProduct();
        }
        else {
            setFetched(false);
        }
    }

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

                <select className='text-l p-4 cursor-pointer' name='mode' onChange={changeMode}>
                    <option value={modeOpt.AddProduct} >Add Product</option>
                    <option value={modeOpt.UpdateProduct}>Update Product</option>
                    <option value={modeOpt.RemoveProduct}>Remove Product</option>
                    <option value={modeOpt.ViewInventory} >View Inventory</option>
                </select>
            </fieldset>
            { // Add Product Form
            mode == modeOpt.AddProduct &&
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
                    })
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
                    <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_price' step='0.01' min='0' />
                    <label htmlFor='quantity'>Product quantity</label>
                    <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_quantity' min='0' />
                    <button className='p-2 border-solid border-2 border-black rounded' type='submit'>
                        Add product
                    </button>
                </Form>
            </Formik>
            }
            { // Update Product Form
                mode == modeOpt.UpdateProduct &&
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
                            <label htmlFor='description'>Product description</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' component='textarea' rows='4' name='product_desc' />
                            <label htmlFor='category'>Product category</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_category' />
                            <label htmlFor='brand'>Product brand</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_brand' />
                            <label htmlFor='origin'>Product origin</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='text' name='product_origin' />
                            <label htmlFor='price'>Product price</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_price' step='0.01' min='0' />
                            <label htmlFor='quantity'>Product quantity</label>
                            <Field className='p-2 border-solid border-2 border-black rounded' type='number' name='product_quantity' min='0' />
                            <button className='p-2 border-solid border-2 border-black rounded' type='submit'>
                                Update product
                            </button>
                            </>}
                        </Form>
                    )}
                </Formik>
            }

            { // Remove Product Form
                mode == modeOpt.RemoveProduct &&
                <Formik
                initialValues={{
                    product_id: product.product_id,
                    product_name: product.product_name
                }}
                onSubmit={(values) => {
                    if(!fetched) {
                        fetchProduct(values.product_id);
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
                </Formik>
            }

            {   // View Inventory Table
                mode == modeOpt.ViewInventory &&
                <DataTable className='border-solid border-2 border-black rounded' value={inventory} tableStyle={{ minWidth: '40rem' }}>
                    <Column field='product_id' header='ID' />
                    <Column field='product_name' header='Name' />
                    <Column field='product_category' header='Category' />
                    <Column field='product_brand' header='Brand' />
                    <Column field='product_origin' header='Origin' />
                    <Column field='product_price' header='Price' />
                    <Column field='product_quantity' header='Quantity' />
                </DataTable>
            }
        </div>
    )
}

export default InventoryManagement