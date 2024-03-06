"use client";

import React from "react";
import { Provider } from "react-redux";
import { store } from "./states/store";
import Homepage from "./homepage";

export default function Home() {
  return (
    <>
      <Provider store={store}>
        <Homepage />
      </Provider>
    </>
  );
}
