"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

import { PrimeReactProvider } from "primereact/api";
import { twMerge } from 'tailwind-merge';
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";

import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../states/store";
import { Column } from "primereact/column";

function UpdatedInventoryManagement() {
  const router = useRouter();

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

  console.log(Object.values(productsList));

  return (
    <div className="flex flex-col items-center p-4">
      <div className="flex-start w-full">
        <button className="rounded-full bg-violet-500 px-4 py-2">Back</button>
      </div>
      <div className="flex flex-row justify-between items-center">
        <div className="flex mr-4">Discount Search Bar</div>
        <div className="flex">
          <button className="p-4 bg-gray-400 rounded-full border border-gra">
            Category Filter
          </button>
          <button className="p-4 bg-violet-700 rounded-full">
            Add New Product
          </button>
        </div>
      </div>
      <div className="flex flex-col items-center bg-slate-100 p-4 w-full">
          <DataTable
            value={Object.values(productsList)}
            size={'small'}
            showGridlines
            paginator
            rows={10}
            rowsPerPageOptions={[10, 20, 30, 40]}
            tableStyle={{}}
          >
            <Column field="product_id" header="ID" sortable style={{ width: '25%' }}></Column>
            <Column field="product_name" header="Name" sortable style={{ width: '25%' }}></Column>
            <Column field="product_category" header="Category" sortable style={{ width: '25%' }}></Column>
            <Column field="product_brand" header="Brand" sortable style={{ width: '25%' }}></Column>
            <Column field="product_origin" header="Origin" sortable style={{ width: '25%' }}></Column>
            <Column field="product_price" header="Price" sortable style={{ width: '25%' }}></Column>
            <Column field="product_quantity" header="Quantity" sortable style={{ width: '25%' }}></Column>
          </DataTable>
      </div>
      <div className="flex-start w-full">
        <button className="rounded-full bg-red px-4 py-2">
          Remove Selected Products
        </button>
      </div>
    </div>
  );
}

export default UpdatedInventoryManagement;
