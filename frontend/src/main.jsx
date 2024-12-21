import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AppProvider } from "./context/productcontext";
import { FilterContextProvider } from "./context/filtercontext.jsx";
import { CartProvider } from "./context/cartcontext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/authcontext.jsx";
import { ContactProvider } from "./context/contactcontext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <AppProvider>
        <ContactProvider>
          <ToastContainer draggable closeOnClick autoClose={2000} />
          <FilterContextProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </FilterContextProvider>
        </ContactProvider>
      </AppProvider>
    </AuthProvider>
  </React.StrictMode>
);
