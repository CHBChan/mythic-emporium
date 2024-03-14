"use client";

import { Provider, useSelector } from "react-redux";
import { RootState, store } from "../states/store";
import UpdatedInventoryManagement from "../components/inventoryManagementSystem";
import { PrimeReactProvider } from "primereact/api";

export default function InventoryHome() {
    return (
        <>
          <Provider store={store}>
            <PrimeReactProvider> 
            <UpdatedInventoryManagement />
            </PrimeReactProvider>
          </Provider>
        </>
      );
}


