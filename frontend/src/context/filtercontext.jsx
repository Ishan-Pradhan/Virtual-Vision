/* eslint-disable  */
import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductContext } from "./productcontext";
import reducer from "../reducer/filterReducer";

const FilterContext = createContext();

const initialState = {
  filter_products: [],
  all_products: [],
  filters: {
    text: "", // Search text
    generalCategory: "All", // Category of eyewear (e.g., sunglasses, prescription glasses)
    genderCategory: "All", // Gender filter (e.g., men, women, unisex)
    frameMaterial: "All", // Filter by frame material (e.g., metal, plastic)
    lensType: "All", // Filter by lens type (e.g., single vision, bifocal)
    lensColor: "All", // Filter by lens color (e.g., gray, blue)
    maxPrice: 0, // Max price for filtering
    price: 0, // Selected price filter
    minPrice: 0, // Min price for filtering
  },
};

export const FilterContextProvider = ({ children }) => {
  const { products } = useProductContext();

  const [state, dispatch] = useReducer(reducer, initialState);

  const updateFilterValue = (event) => {
    let name = event.target.name;
    let value = event.target.value;

    return dispatch({
      type: "UPDATE_FILTERS_VALUE",
      payload: { name, value },
    });
  };

  useEffect(() => {
    dispatch({ type: "FILTER_PRODUCTS" });
  }, [products, state.filters]);

  useEffect(() => {
    dispatch({ type: "LOAD_FILTER_PRODUCTS", payload: products });
  }, [products]);

  return (
    <FilterContext.Provider value={{ ...state, updateFilterValue }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  return useContext(FilterContext);
};
