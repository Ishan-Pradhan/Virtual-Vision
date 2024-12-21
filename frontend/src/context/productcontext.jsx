/* eslint-disable  */
import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/productReducer";

const AppContext = createContext();

const API = "/api/v1/product"; // Endpoint for general product fetching

const AppProvider = ({ children }) => {
  const initialState = {
    isLoading: false,
    isError: false,
    products: [],
    featureProducts: [],
    isSingleLoading: false,
    singleProduct: {},
    newArrivalProducts: [],
    bestsellers: [],
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  // Fetch all products
  const getProducts = async (url) => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get(url);
      const products = await res.data;

      // Dispatch action to store products
      dispatch({ type: "PRODUCTS", payload: products });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // Fetch single product details
  const getSingleProduct = async (url) => {
    dispatch({ type: "SET_SINGLE_LOADING" });
    try {
      const res = await axios.get(url, { withCredentials: true });
      const singleProduct = await res.data;
      // Dispatch action to store single product data
      dispatch({ type: "SET_SINGLE_PRODUCT", payload: singleProduct });
    } catch (error) {
      dispatch({ type: "SET_SINGLE_ERROR" });
    }
  };

  // Fetch new arrival products
  const getNewArrivalProducts = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get("/api/v1/newarrivals");
      const newArrivalProducts = await res.data;

      // Dispatch action for new arrivals
      dispatch({
        type: "SET_NEW_ARRIVAL_PRODUCTS",
        payload: newArrivalProducts,
      });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  // Fetch bestseller products
  const getBestsellers = async () => {
    dispatch({ type: "SET_LOADING" });
    try {
      const res = await axios.get("api/v1/bestsellers");
      const bestsellingProducts = await res.data;

      // Dispatch action for bestsellers
      dispatch({
        type: "SET_BESTSELLERS_PRODUCTS",
        payload: bestsellingProducts,
      });
    } catch (error) {
      dispatch({ type: "API_ERROR" });
    }
  };

  useEffect(() => {
    // Fetch necessary data on initial load
    getNewArrivalProducts();
    getBestsellers();
    getProducts(API); // Get general products
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        getSingleProduct,
        getNewArrivalProducts,
        getBestsellers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useProductContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext, useProductContext };
