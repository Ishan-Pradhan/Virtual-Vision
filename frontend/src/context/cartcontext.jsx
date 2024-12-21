import { createContext, useContext, useEffect, useReducer } from "react";
import { toast } from "react-toastify";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("cart");
  if (localCartData == []) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};

const initialState = {
  // cart: [],
  cart: getLocalCartData() || [],
  total_item: 0,
  total_price: "",
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const addToCart = (_id, stock, price, product) => {
    const existingProduct = state.cart.find((item) => item._id === _id);

    if (existingProduct) {
      toast.error("This item is already in your cart.");
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { _id, stock, price, product } });
  };

  const removeItem = (_id) => {
    dispatch({ type: "REMOVE_ITEM", payload: _id });
  };

  const setDecrease = (_id) => {
    dispatch({ type: "SET_DECREMENT", payload: _id });
  };
  const setIncrease = (_id) => {
    dispatch({ type: "SET_INCREMENT", payload: _id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  useEffect(() => {
    dispatch({ type: "CART_TOTAL_ITEM" });
    dispatch({ type: "CART_TOTAL_PRICE" });
    localStorage.setItem("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeItem,
        clearCart,
        setDecrease,
        setIncrease,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };
