import { NavLink } from "react-router-dom";
import { useProductContext } from "../../context/productcontext";
import Loading from "../Loading";
import FeatureProducts from "../FeatureProducts";
import { scrollToTop } from "../../utils/scrollTop";

function BestsellersSection() {
  const { isLoading, products } = useProductContext();
  const bestsellers = products.filter((product) => product.quantitySold >= 5);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section id="feature-products" className="my-20" data-aos="zoom-in-down">
      <div className="container mx-auto px-16">
        <div className="flex justify-center md:justify-between items-center">
          <span className="font-head text-3xl font-semibold text-center">
            Best sellers
          </span>

          <NavLink
            to="/Bestsellers"
            className="hidden uppercase text-sm font-bold md:flex gap-2 "
            onClick={scrollToTop}
          >
            View More
            <span>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
          </NavLink>
        </div>

        {bestsellers.length === 0 ? (
          <h2 className="text-center mt-10 text-lg font-semibold">
            No best sellers yet
          </h2>
        ) : (
          <div
            className={`flex flex-col gap-y-14 md:flex-row items-center my-10 flex-wrap ${
              bestsellers.length <= 3
                ? "justify-start gap-x-16"
                : "justify-between"
            }`}
          >
            {bestsellers.map((product) => (
              <FeatureProducts key={product._id} product={product} />
            ))}
          </div>
        )}

        {bestsellers.length > 0 && (
          <NavLink
            to="/Bestsellers"
            className="flex items-center justify-center uppercase text-sm font-bold md:hidden gap-2 mt-10"
            onClick={scrollToTop}
          >
            View More
            <span>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
          </NavLink>
        )}
      </div>
    </section>
  );
}

export default BestsellersSection;
