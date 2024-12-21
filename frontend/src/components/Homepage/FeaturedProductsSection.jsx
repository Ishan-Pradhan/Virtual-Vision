import { NavLink } from "react-router-dom";
import FeatureProducts from "../FeatureProducts";
import { useProductContext } from "../../context/productcontext";
import Loading from "../Loading";
import { scrollToTop } from "../../utils/scrollTop";

function FeaturedProductsSection() {
  const { isLoading, featureProducts } = useProductContext();

  if (isLoading) {
    return <Loading />;
  }

  if (featureProducts.length === 0) {
    return;
  }

  return (
    <section id="feature-products" className="my-20" data-aos="zoom-in-down">
      <div className="container mx-auto px-5 md:px-16">
        {/* categories title */}
        <div className="flex justify-center md:justify-between items-center">
          <span className="font-head text-3xl font-semibold text-center">
            Check our selection
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
        <div className="flex flex-col gap-y-14  md:flex-row items-center my-10 flex-wrap gap-[4rem] justify-start gap-x-16">
          {featureProducts.map((product) => {
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
      </div>
    </section>
  );
}

export default FeaturedProductsSection;
