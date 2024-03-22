"use client";

import { useCallback, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import '@ag-grid-community/styles/ag-grid.css';
import "ag-grid-community/styles/ag-theme-quartz.css";
import { AgGridReact } from "ag-grid-react";

import { useDispatch, useSelector } from "react-redux";
import { RootState, store } from "../states/store";
import { brandsDirectory, originsDirectory, productType, productsListType } from "../interface/interface";
import { productsDirectoryType, removeProductFromDirectory, setProductsDirectory } from "../states/productsListReducer";
import { ProductEditButton } from "./productEditButton";

function UpdatedInventoryManagement(this: any) {
  const router = useRouter();
  const tableRef = useRef<AgGridReact<productType>>(null);

  async function adminVerification() {
    try {
      const response = await axios.get("api/users/roleVerification");
    } catch (error: any) {
      console.error("Verification process failed: " + error.message);
      router.push("/");
    }
  }

  const productsList = useSelector(
    (state: RootState) => state.productsDirectory.productsList
  );

  const dispatch = useDispatch();

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
        onClick: (product_id : number) => {
          console.log(`Editing product[${product_id}]`);
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

  const removeProduct = async (product_id: number) => {
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
      removeProduct(row.product_id);
    })
  };

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 30];

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex-start w-full">
        <button 
          className="rounded-full bg-violet-500 px-4 py-2"
          onClick={() => router.back()}
        >Back
        </button>
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
