/* eslint-disable */
const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "PRODUCTS":
      // Filter featured products from the payload
      const featureData = action.payload
        ? action.payload.filter((curEl) => curEl.featured === true)
        : [];

      // Return the updated state
      return {
        ...state,
        isLoading: false,
        products: action.payload, // Store all products
        featureProducts: featureData, // Store only featured products
      };

    case "API_ERROR":
      return { ...state, isLoading: false, isError: true };

    case "SET_SINGLE_LOADING":
      return { ...state, isSingleLoading: true };

    case "SET_SINGLE_PRODUCT":
      // Store single product data
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload, // The single product info (with all attributes)
      };

    case "SET_SINGLE_ERROR":
      return { ...state, isSingleLoading: false, isError: true };

    case "SET_NEW_ARRIVAL_PRODUCTS":
      // Store new arrival products
      return {
        ...state,
        newArrivalProducts: action.payload,
      };

    case "SET_BESTSELLERS_PRODUCTS":
      // Store bestseller products
      return {
        ...state,
        bestsellersProducts: action.payload,
      };

    default:
      return state;
  }
};

export default ProductReducer;
