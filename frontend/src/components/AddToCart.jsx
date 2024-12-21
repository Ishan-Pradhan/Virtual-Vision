/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import { useCartContext } from "../context/cartcontext";
import { scrollToTop } from "../utils/scrollTop";

function AddToCart({ product, buttonText, disabled }) {
  const { addToCart } = useCartContext();

  const { _id, stock, price } = product;
  return (
    <NavLink
      to="/Cart"
      className="w-full"
      onClick={() => addToCart(_id, stock, price, product)}
    >
      {buttonText ? (
        <button
          className={`bg-primary w-full  py-1 px-6 text-md  transition delay-50 hover:bg-primaryShadow hover:ease-in-out  flex gap-3 justify-center items-center`}
          onClick={scrollToTop}
          disabled={disabled}
        >
          <span className="text-background font-semibold">Add to Cart </span>{" "}
          <i
            className="fa-solid fa-cart-shopping text-background
"
          ></i>
        </button>
      ) : (
        <i className="fa-solid fa-bag-shopping bg-background text-2xl text-secondary hover:text-primaryShadow border p-4 rounded-full h-14 w-14 cursor-pointer transition delay-50 hover-ease-in flex items-center justify-center absolute bottom-3 right-3"></i>
      )}
    </NavLink>
  );
}

export default AddToCart;
