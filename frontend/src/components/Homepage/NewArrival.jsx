/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import AddToCart from "../AddToCart";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/light.css";

function NewArrival({ product }) {
  if (product.stock === 0) {
    return (
      <NavLink
        to={`/SingleProducts/${product._id} `}
        // data-aos="zoom-in-down"
        className="  w-60"
      >
        <div className="hover:-translate-y-3 transition-transform ease-in duration-200 hover:shadow-lg border relative">
          <div className="absolute w-full h-full  top-0 z-40 flex justify-center items-center ">
            <span className="bg-background border shadow-lg px-3 py-1 -rotate-6">
              currently out of stock
            </span>
          </div>
          <div className="relative h-60 w-full">
            <img
              src={product.productImg}
              alt=""
              className="h-full w-full object-contain  overflow-hidden  relative"
            />
          </div>
          <div className="px-3 py-3 bg-white border-t flex flex-col  ">
            <h3 className="flex text-lg font-head font-extrabold mb-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
              <Tippy
                theme={"light"}
                interactive={true}
                content={product.productName}
              >
                <span className="overflow-hidden whitespace-nowrap overflow-ellipsis z-40">
                  {" "}
                  {product.productName}
                </span>
              </Tippy>
            </h3>
            <div className="flex justify-between items-center mb-2">
              {product.discount > 0 ? (
                <span className="text-xl font-semibold text-secondary">
                  Rs. {product.price - product.price * (product.discount / 100)}
                </span>
              ) : (
                <span className="text-xl font-semibold text-secondary">
                  Rs. {product.price}
                </span>
              )}
              <div className="flex gap-1">
                <span
                  className={`text-md font-semibold text-gray-500 ${
                    product.discount > 0 ? "line-through" : "text-secondary"
                  }`}
                >
                  {product.discount > 0 ? (
                    <span className="text-[10px]">Rs. {product.price}</span>
                  ) : (
                    ""
                  )}
                </span>
                {product.discount > 0 ? (
                  <span className={`text-sm text-gray-500`}>
                    -{product.discount}%
                  </span>
                ) : (
                  ""
                )}
              </div>
            </div>

            <AddToCart product={product} buttonText={"yes"} disabled={true} />
          </div>
        </div>
      </NavLink>
    );
  }

  return (
    <NavLink
      to={`/SingleProducts/${product._id} `}
      // data-aos="zoom-in-down"
      className="w-60"
    >
      <div className="hover:-translate-y-3 transition-transform ease-in duration-200 hover:shadow-lg border relative">
        <div className="relative h-60 w-full">
          <img
            src={product.productImg}
            alt=""
            className="h-full w-full object-contain overflow-hidden  relative"
          />
        </div>
        <div className="px-3 py-3 bg-white border-t flex flex-col  overflow-hidden">
          <h3 className="flex text-lg font-head font-extrabold mb-1 overflow-hidden whitespace-nowrap overflow-ellipsis">
            <Tippy
              theme={"light"}
              interactive={true}
              content={product.productName}
            >
              <span className="overflow-hidden whitespace-nowrap overflow-ellipsis">
                {" "}
                {product.productName}
              </span>
            </Tippy>
          </h3>
          <div className="flex justify-between items-center mb-2">
            {product.discount > 0 ? (
              <span className="text-xl font-semibold text-secondary">
                Rs. {product.price - product.price * (product.discount / 100)}
              </span>
            ) : (
              <span className="text-xl font-semibold text-secondary">
                Rs. {product.price}
              </span>
            )}
            <div className="flex items-center gap-1">
              <span
                className={`text-sm font-semibold text-gray-500 ${
                  product.discount > 0 ? "line-through" : "text-secondary"
                }`}
              >
                {product.discount > 0 ? <span>Rs. {product.price}</span> : ""}
              </span>
              {product.discount > 0 ? (
                <span className={`text-sm text-gray-500`}>
                  -{product.discount}%
                </span>
              ) : (
                ""
              )}
            </div>
          </div>
          <AddToCart product={product} buttonText={"yes"} disabled={false} />
        </div>
        <span className="absolute top-2 right-2 bg-secondary text-background font-semibold px-3 py-1 text-sm rounded-full">
          New
        </span>
      </div>
    </NavLink>
  );
}

export default NewArrival;
