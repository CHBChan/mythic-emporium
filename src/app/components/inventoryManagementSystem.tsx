"use client";

import { useCallback, useEffect, useRef, useState, useLayoutEffect} from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import '@ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../states/store";
import { brandsDirectory, originsDirectory, productType, productsListType } from "../interface/interface";
import { productsDirectoryType, removeProductFromDirectory, updateProductInDirectory, setProductsDirectory, addProductToDirectory } from "../states/productsListReducer";
import { ProductEditButton } from "./productEditButton";
import ImageUpload from "./imageUpload";
import Modal from 'react-modal';

//if errors with modal occur see this - https://reactcommunity.org/react-modal/accessibility/
// Modal.setAppElement('#root');
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


function UpdatedInventoryManagement(this: any) {
  const router = useRouter();
  const tableRef = useRef<AgGridReact<productType>>(null);
  

  async function adminVerification() {
    try {
      const response = await axios.get("api/users/roleVerification");
      if(response.data.role != 'authenticated') {
        router.push("/");
      }
    } catch (error: any) {
      console.error("Verification process failed: " + error.message);
      router.push("/");
    }
  }

  useLayoutEffect(() => {
    // Verify that the user is authenticated
    console.log('Checking admin verificaiton.');
    adminVerification();
  }, [])

  const productsList = useSelector(
    (state: RootState) => state.productsDirectory.productsList
  );
  const dispatch = useDispatch();

  const handleUpdateProductPress = (product: productType) => {
    setAddingProductFlag(false);
    setSelectedProduct(product);
    toggleUpdateModal();
  }
  const handleAddProductPress = () => {
    const emptyProduct: productType = {
      product_id: null,
      product_name: '',
      product_desc: '',
      product_category: '',
      product_brand: '',
      product_origin: '',
      product_price: -1,
      product_quantity: -1,
      product_image: null,
      product_disclaimers: [],
    }
    setSelectedProduct(emptyProduct);
    setAddingProductFlag(true);
    toggleUpdateModal();
  }

  const colDefs: any[] = [
    {
      headerName: "ID",
      valueGetter: (p: any) => p.data.product_id,
      headerCheckboxSelection: true,
      checkboxSelection: true,
      filter: 'agNumberColumnFilter',
      minWidth: 60,
      maxWidth: 100,
    },
    {
      headerName: "Name",
      valueGetter: (p: any) => p.data.product_name,
      filter: 'agTextColumnFilter',
      minWidth: 240,
    },
    {
      headerName: "Category",
      valueGetter: (p: any) => p.data.product_category,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: "Brand",
      valueGetter: (p: any) => p.data.product_brand,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: "Origin",
      valueGetter: (p: any) => p.data.product_origin,
      filter: 'agTextColumnFilter',
    },
    {
      headerName: "Price",
      valueGetter: (p: any) => p.data.product_price,
      filter: 'agNumberColumnFilter',
      maxWidth: 160,
    },
    {
      headerName: "Quantity",
      valueGetter: (p: any) => p.data.product_quantity,
      filter: 'agNumberColumnFilter',
      maxWidth: 160,
    },
    {
      headerName: "Edit",
      sortable: false,
      cellRenderer: ProductEditButton,
      cellRendererParams: {
        // This is the callback function for the Edit button press
        onClick: (product: productType) => {
          // console.log(`Editing product[${product}]`);
          // console.log(`product id ${product.product_id}`);
          // console.log(`product name: ${product.product_name}`);
          // console.log(`product quanitity: ${product.product_quantity}`);

          handleUpdateProductPress(product);
        }
      }
    }
  ]


  // This triggers when the checkbox of row(s) is/are checked
  const onSelectionChanged = useCallback(() => {
    const selectedRows = tableRef.current!.api.getSelectedRows();
    selectedRows?.forEach((row) => {
      console.log(`Product of ID[${row.product_id}] selected`);
    })
  }, []);

  const removeProduct = async (product_id: string) => {
    try {
      dispatch(removeProductFromDirectory(product_id));
      //const response = await axios.post("api/products/removeProduct", { product_id });
    }
    catch (error: any) {
      console.error("Product failed to be removed: " + error.message);
    }
  }

  const handleRemoveProducts = () => {
    const selectedRows = tableRef.current!.api.getSelectedRows();
    selectedRows.forEach((row) => {
      console.log(`Removing product[${row.product_id}]`);
      removeProduct(row.product_id!);
    })
  };

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 50, 200];




  const handleUpdateProduct = () => {
    try {
      if (selectedProduct !== null) {
        if (selectedProduct.product_name === '') {
          setMissingRequiredFields(true);
          return;
        } else {
          dispatch(updateProductInDirectory(selectedProduct));
          setMissingRequiredFields(false);
          toggleUpdateModal();
        }
      } else {
        //TODO: user notice here
        console.log("Attempted to update a product with nothing. To delete use remove feature.")
      }
      //const response = await axios.post("api/products/removeProduct", { product_id });
      toggleUpdateModal();
    }
    catch (error: any) {
      console.error("Product failed to be updated: " + error.message);
    }
  }

  const [missingRequiredFields, setMissingRequiredFields] = useState(false);

  const handleAddProduct = async () => {
    try {
      if (selectedProduct !== null) {
        if (selectedProduct.product_quantity === -1 ||
          selectedProduct.product_price === -1 ||
          selectedProduct.product_name === '') {
          setMissingRequiredFields(true);
          return;
        } else {
          console.log('REACHED pre api response');
          //call the api here to send product to supabase
          const response1 = await axios.get("api/users/roleVerification");
          const response = await axios.post("api/products/addProduct", selectedProduct);
          console.log('REACHED post api response');
          if(response.data.message) {
            console.log(response.data.message);
          }
          if (response.data.success) {
            dispatch(addProductToDirectory(selectedProduct));
            setMissingRequiredFields(false);
            toggleUpdateModal();
          } else {
            //user message about failed adding to server - pls fill out help form 
          }
        }
      } else {
        //TODO: user notice here
        console.log("Attempted to add a product with nothing. To delete use remove feature.")
      }
    } catch (error: any) {
      console.error("Product failed to be added: " + error.message);
    }
  }



  //**********************************MODAL CODE***********************************/
  //flag true when user is adding a product through the modal, false in all other cases
  //assuming false case = user updating product through modal
  const [addingProductFlag, setAddingProductFlag] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<productType | null>(null);

  const updateSelectedProduct = (updatedProps: Partial<productType>) => {
    setSelectedProduct(prevProduct => {
      if (!prevProduct) return null;

      // Create a new object with only the properties that exist in productType
      const updatedProduct: productType = {
        ...prevProduct,
        ...updatedProps
      };

      return updatedProduct;
    });
  };


  const handleProductDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'product_price' || name === 'product_quantity' ? parseFloat(value) || 0 : value;

    updateSelectedProduct({ [name]: parsedValue });
  };


  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleUpdateModal = () => {
    setIsModalOpen(!isModalOpen);
  }



  const handleFileChange = (uploadedFile: File) => {
    console.log('Handle file uploaded here.');
    console.log(uploadedFile);

    //update state variable with file here
  };

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex-start w-full">
        <button 
          className="rounded-full bg-violet-500 px-4 py-2"
          onClick={() => router.back()}
        >Back
        </button>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex mr-4">Discount Search Bar</div>
        <div className="flex">
          <button className="p-4 bg-gray-400 rounded-full border border-gra">
            Category Filter
          </button>
          <button
            className="rounded-full bg-red-600 px-4 py-2"
            onClick={handleAddProductPress}
          >
            Add New Product
          </button>

          {/* Add Product Form */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={toggleUpdateModal}
            contentLabel="Update Modal"
            className="modal bg-white rounded-lg shadow-lg"
            overlayClassName="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center"
          >
            <h2 className="text-lg font-semibold mb-4">{addingProductFlag ? "Add Product" : "Update Product"}</h2>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <label className="mr-2">Product Name:</label>
                <input
                  type="text"
                  className="input-text"
                  name="product_name"
                  value={selectedProduct?.product_name}
                  onChange={handleProductDataChange}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2">Product Description:</label>
                <input
                  type="text"
                  className="input-text"
                  placeholder={selectedProduct?.product_desc}
                  name="product_desc"
                  value={selectedProduct?.product_desc}
                  onChange={handleProductDataChange}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2">Product Category:</label>
                <input
                  type="text"
                  className="input-text"
                  placeholder={selectedProduct?.product_category}
                  name="product_category"
                  value={selectedProduct?.product_category}
                  onChange={handleProductDataChange}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2">Product Brand:</label>
                <input
                  type="text"
                  className="input-text"
                  placeholder={selectedProduct?.product_brand}
                  name="product_brand"
                  value={selectedProduct?.product_brand}
                  onChange={handleProductDataChange}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2">Product Origin:</label>
                <input
                  type="text"
                  className="input-text"
                  placeholder={selectedProduct?.product_origin}
                  name="product_origin"
                  value={selectedProduct?.product_origin}
                  onChange={handleProductDataChange}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2">Product Price:</label>
                <input
                  type="number"
                  className="input-text"
                  placeholder={selectedProduct?.product_price !== -1 ? `${selectedProduct?.product_price}` : ''}
                  name="product_price"
                  value={selectedProduct?.product_price !== -1 ? `${selectedProduct?.product_price}` : ''}
                  onChange={handleProductDataChange}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-2">Product Quantity:</label>
                <input
                  type="number"
                  className="input-text"
                  placeholder={selectedProduct?.product_quantity !== -1 ? `${selectedProduct?.product_quantity}` : ''}
                  name="product_quantity"
                  value={selectedProduct?.product_quantity !== -1 ? `${selectedProduct?.product_quantity}` : ''}
                  onChange={handleProductDataChange}
                />
              </div>
              <div className="flex items-center">
                <ImageUpload onFileChange={handleFileChange} />
              </div>
              <div className="flex items-center">
                <label className="mr-2">Product Disclaimers:</label>
                
              </div>
            </div>
            {/* TODO: add red border around missing fields */}
            {missingRequiredFields && (
              <div className='text-sm text-rose-500'>Please fill in all required fields</div>
            )}
            <button onClick={addingProductFlag ? handleAddProduct : handleUpdateProduct} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              {addingProductFlag ? "Add Product" : "Update Product"}
            </button>
          </Modal>

        </div>
      </div>
      <div className="bg-slate-100 p-4 w-full h-[500px] ag-theme-quartz">
        <AgGridReact
          ref={tableRef}
          rowData={Object.values(productsList)}
          columnDefs={colDefs}
          rowSelection={"multiple"}
          suppressRowClickSelection={true}
          onSelectionChanged={onSelectionChanged}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
      <div className="flex-start w-full my-4">
        <button
          className="rounded-full bg-red-600 px-4 py-2"
          onClick={() => handleRemoveProducts()}
        >
          Remove Selected Products
        </button>
      </div>
    </div>
  );
}

export default UpdatedInventoryManagement;
