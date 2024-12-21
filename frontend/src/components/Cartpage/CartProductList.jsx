import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../../context/authcontext";
import { useCartContext } from "../../context/cartcontext";
import CartProducts from "./CartProducts";
import FeatureProducts from "../FeatureProducts";
import { useProductContext } from "../../context/productcontext";
import { scrollToTop } from "../../utils/scrollTop";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

function CartProductList() {
  const { isLoading, featureProducts } = useProductContext();
  const { cart, clearCart, total_price } = useCartContext();
  const [auth] = useAuthContext();
  const navigate = useNavigate();
  const [payment_method, setPayment_method] = useState("khalti");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  useEffect(() => {
    if (auth.user) {
      setBillingPhone(auth.user.phone);
      setBillingAddress(auth.user.address);
    }
  }, [auth.user]);

  const handleCheckout = async () => {
    if (cart.length === 0) {
      toast.error(
        "Your cart is empty. Please add items before proceeding to checkout."
      );
      return;
    }

    if (!auth.user) {
      toast.error("Login before Checking out");
      navigate("/Login", { state: "/cart" });
    }

    const productDetails = cart.map((item) => ({
      name: item.name,
      identity: item._id,
      total_price: item.quantity * item.price,
      quantity: item.quantity,
      unit_price: item.price,
    }));

    const payload = {
      amount: total_price,
      customer_info: {
        name: auth.user.name,
        email: auth.user.email,
        phone: billingPhone,
        address: billingAddress,
      },
      products_details: productDetails,
      payment_method,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/create-orders",
        payload
      );

      if (response) {
        if (payment_method === "khalti") {
          window.location.href = response.data.data.payment_url;
          clearCart();
        } else {
          toast.success("Your order has been registered");
          clearCart();
        }
      }
    } catch (error) {
      console.error("Error creating order:", error);
      toast.error("Failed to create order");
    }
  };

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setBillingPhone(value);
    } else if (name === "address") {
      setBillingAddress(value);
    }
  };

  return (
    <section>
      <div className="container mx-auto my-10">
        <h2 className="text-3xl font-semibold mb-4">Shopping Cart</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 border-y py-4 md:px-8 ">
          <div className="md:col-span-2  font-extrabold text-lg">Product</div>
          <div className="col-span-1 font-extrabold text-lg hidden md:flex">
            Price
          </div>
          <div className="col-span-1 font-extrabold text-lg">Quantity</div>
          <div className="col-span-1 font-extrabold text-lg">Sub Total</div>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-col justify-center items-center w-full">
            <img src="/images/empty-cart.png" alt="" className="w-44 h-44" />
            <span>Your Cart is Empty.</span>
          </div>
        ) : (
          cart.map((item) => <CartProducts key={item._id} item={item} />)
        )}
        {cart.length === 0 ? (
          ""
        ) : (
          <div className="flex items-center justify-between mt-16">
            <h3 className="text-xl">
              Order Total:{" "}
              <span className="font-semibold">Rs.{total_price}</span>
            </h3>
            <button
              className=" text-red-600 hover:underline"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
        )}

        <div className="mt-8"></div>

        <div className="flex flex-col container  mt-4 ">
          <div className="flex flex-col justify-center border border-gray-300 md:flex-row">
            {auth.user && (
              <div className="flex flex-col gap-4 px-4 md:px-10 py-5 ">
                <p className="text-center font-semibold uppercase">
                  Billing Information
                </p>
                <div className="grid grid-cols-2 gap-y-2 items-center">
                  <span className="font-bold">Name</span>
                  <span>{auth.user.name}</span>
                  <span className="font-bold">Email</span>
                  <span className="flex">
                    <Tippy
                      theme={"light"}
                      interactive={true}
                      content={auth.user.email}
                    >
                      <span className=" overflow-hidden overflow-ellipsis whitespace-nowrap">
                        {auth.user.email}
                      </span>
                    </Tippy>
                  </span>
                  <span className="font-bold">Phone Number</span>
                  <span>{auth.user.phone}</span>
                  <span className="font-bold">Delivery Address</span>
                  <span>{auth.user.address}</span>
                </div>
              </div>
            )}

            {auth.user && (
              <div className="flex flex-col gap-4 px-10 py-5 md:ml-4">
                <p className="text-center font-semibold uppercase">
                  Update Billing Address
                </p>
                <form className="grid grid-cols-2 gap-y-4">
                  <label htmlFor="phone" className="font-bold">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="text"
                    className="ring-1 px-2 ring-gray-300 rounded"
                    name="phone"
                    value={billingPhone}
                    onChange={handleBillingInfoChange}
                  />
                  <label htmlFor="address" className="font-bold">
                    Delivery Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="ring-1 px-2 ring-gray-300 rounded"
                    name="address"
                    value={billingAddress}
                    onChange={handleBillingInfoChange}
                  />
                </form>
              </div>
            )}
          </div>
          <div className="flex flex-col border border-gray-300 border-t-0 ">
            <div className="flex gap-10  justify-center md:justify-center items-center px-4 md:px-10 py-4 ">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="khalti"
                  name="payment_method"
                  value="khalti"
                  checked={payment_method === "khalti"}
                  onChange={() => setPayment_method("khalti")}
                />
                <label htmlFor="khalti" className="ml-2 text-sm md:text-base">
                  Pay with Khalti
                </label>
              </div>

              <div className="flex items-center ">
                <input
                  type="radio"
                  id="cashOnDelivery"
                  name="payment_method"
                  value="cashOnDelivery"
                  checked={payment_method === "cashOnDelivery"}
                  onChange={() => setPayment_method("cashOnDelivery")}
                />
                <label
                  htmlFor="cashOnDelivery"
                  className="ml-2 text-sm md:text-base"
                >
                  Cash on Delivery
                </label>
              </div>
            </div>
            <button
              className="bg-secondary text-background hover:bg-primaryShadow px-6 py-3 "
              onClick={handleCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:justify-between items-center mt-32">
        <span className="font-head text-3xl font-semibold text-center">
          Check other products
        </span>

        <NavLink
          to="/WomenProduct"
          className="hidden uppercase text-sm font-bold md:flex gap-2 "
          onClick={scrollToTop}
        >
          View More
          <span>
            <i className="fa-solid fa-arrow-right-long"></i>
          </span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-12 md:flex-row items-center justify-between my-10 flex-wrap">
        {featureProducts.slice(0, 4).map((product) => {
          return <FeatureProducts key={product._id} product={product} />;
        })}
      </div>
      <NavLink
        to="/WomenProduct"
        className="flex items-center justify-center uppercase text-sm font-bold md:hidden gap-2 mt-10"
        onClick={scrollToTop}
      >
        View More
        <span>
          <i className="fa-solid fa-arrow-right-long"></i>
        </span>
      </NavLink>
    </section>
  );
}

export default CartProductList;
