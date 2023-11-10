import React from "react";
import { createRoot } from 'react-dom/client';
// import ReactDOM from "react-dom";
import {BrowserRouter as Router} from "react-router-dom"
import { makeServer } from "./server";
import App from "./App";

import { ContextProvider } from "./context/ContextProvider";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";
import WishlistProvider from "./context/WishlistProvider";
import "./index.css";

const container = document.getElementById('root');
const root = createRoot(container);

// Call make Server
makeServer();

root.render(
  <React.StrictMode>
    <Router>
      <ContextProvider>
         <CartProvider>
            <WishlistProvider>
              <AuthProvider>
                <App/>
             </AuthProvider>
            </WishlistProvider>
         </CartProvider>
      </ContextProvider>
    </Router>
  </React.StrictMode>
);
