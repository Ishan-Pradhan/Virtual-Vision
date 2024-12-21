import { useEffect, useState } from "react";
import Header from "../components/Header";
import { NavLink, useParams } from "react-router-dom";
import { useProductContext } from "../context/productcontext";
import PageNavigation from "../components/PageNavigation";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import { scrollToTop } from "../utils/scrollTop";
import FeatureProducts from "../components/FeatureProducts";
import { useCartContext } from "../context/cartcontext";
import TryOn from "./TryOn";

const API = "/api/v1/product";

function SingleProducts() {
  const { isSingleLoading, getSingleProduct, singleProduct, products } =
    useProductContext();

  const [tryOn, setTryOn] = useState(true);

  const handleTryOn = () => {
    setTryOn(!tryOn);
    console.log(tryOn);
  };

  const { addToCart } = useCartContext();

  const { id } = useParams();

  const {
    _id,
    productImg,
    productName,
    description,
    price,
    discount,
    composition,
    size,
    stock,
    weight,
    generalCategory,
    genderCategory,
    frameMaterial,
    lensType,
    lensColor,
    frameColor, // Assuming this field is added to your product model
  } = singleProduct;

  useEffect(() => {
    getSingleProduct(`${API}/${id}`);
  }, [id]);

  const relatedProducts = products
    .filter(
      (product) =>
        product.generalCategory === generalCategory &&
        product.genderCategory === genderCategory &&
        product._id !== _id
    )
    .slice(0, 4);

  if (isSingleLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <PageNavigation title={productName} />

      <main>
        <section className="container m-auto px-16">
          <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-0">
            <div className="w-full md:w-1/2 flex justify-start ">
              {tryOn ? (
                <img
                  src={productImg}
                  alt={productName}
                  className="w-[500px] md:h-[500px] object-contain "
                />
              ) : (
                <div className="w-[500px] h-[500px] bg-black">
                  <TryOn products={{ products }} />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-10 justify-center items-start md:w-1/2">
              <div className="flex flex-col gap-5 w-full">
                <span className="uppercase text-sm font-bold font-head text-gray-400">
                  {genderCategory} / {generalCategory}
                </span>
                <div className="flex flex-col gap-2">
                  <p className="font-head font-bold capitalize text-3xl md:text-4xl">
                    {productName}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-5 items-center">
                      <span
                        className={`${
                          !discount ? "text-secondary" : ""
                        } text-lg font-bold md:font-semibold md:text-2xl ${
                          discount > 0 ? "line-through text-gray-500" : ""
                        }`}
                      >
                        Rs. {price}
                      </span>
                      {discount > 0 ? (
                        <span className="text-lg font-bold md:text-2xl text-secondary md:font-semibold">
                          Rs. {price - price * (discount / 100)}
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <span
                      className={`font-bold text-[14px] md:text-sm ${
                        stock < 5 ? "text-red-400" : "text-green-500"
                      }`}
                    >
                      {stock === 0 ? "Out of Stock" : `${stock} in stock`}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-lg md:text-justify leading-6">
                      {description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <h3 className="text-lg text-gray-500 border-b-2 py-1 col-span-2 mb-2 font-semibold">
                      DETAILS
                    </h3>
                    <span className="text-gray-500 text-lg">Composition</span>
                    <span className="text-gray-500 text-lg">
                      {composition ? composition : "NA"}
                    </span>
                    <span className="text-gray-500 text-lg">Size: </span>
                    <span className="text-gray-500 text-lg">
                      {size ? size : "NA"}
                    </span>
                    <span className="text-gray-500 text-lg">Weight: </span>
                    <span className="text-gray-500 text-lg">
                      {weight ? weight : "NA"}
                    </span>
                    <span className="text-gray-500 text-lg">
                      Frame Material:
                    </span>
                    <span className="text-gray-500 text-lg">
                      {frameMaterial ? frameMaterial : "NA"}
                    </span>
                    <span className="text-gray-500 text-lg">Lens Type:</span>
                    <span className="text-gray-500 text-lg">
                      {lensType ? lensType : "NA"}
                    </span>
                  </div>
                </div>
              </div>

              {stock === 0 ? (
                <div className="py-3 flex flex-col border-y-2 w-full">
                  <h4 className="text-secondary text-lg text-bold">
                    Currently unavailable.
                  </h4>
                  <p>
                    We do not know when or if this item will be back in stock.
                  </p>
                </div>
              ) : (
                <div className="w-full flex flex-col gap-4">
                  <button
                    className={`bg-secondary w-full py-3 px-6 text-md transition delay-50 hover:bg-primaryShadow hover:ease-in-out flex gap-3 justify-center items-center`}
                    onClick={() => {
                      handleTryOn();
                    }}
                  >
                    <span className="text-background font-semibold">
                      {tryOn ? "Try it on" : "Close Try On"}
                    </span>
                    <i className="fa-solid fa-glasses text-background"></i>
                  </button>

                  <NavLink
                    to="/Cart"
                    className="w-full flex justify-end"
                    onClick={() => addToCart(_id, stock, price, singleProduct)}
                  >
                    <button
                      className={`bg-primary w-full py-3 px-6 text-md transition delay-50 hover:bg-primaryShadow hover:ease-in-out flex gap-3 justify-center items-center`}
                      onClick={scrollToTop}
                    >
                      <span className="text-background font-semibold">
                        Add to Cart
                      </span>
                      <i className="fa-solid fa-cart-shopping text-background"></i>
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="container m-auto px-16 mt-20">
          <span className="font-head text-3xl font-semibold text-center">
            Related Products
          </span>
          <div
            className={`flex flex-col gap-y-14 md:flex-row items-center my-10 flex-wrap ${
              relatedProducts.length <= 3
                ? "justify-start gap-x-16"
                : "justify-between"
            }`}
          >
            {relatedProducts.map((product) => (
              <FeatureProducts key={product._id} product={product} />
            ))}
            {relatedProducts.length === 0 ? (
              <span>No products to show.</span>
            ) : (
              ""
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default SingleProducts;
