import { NavLink } from "react-router-dom";
import { useProductContext } from "../../context/productcontext";
import Loading from "../Loading";
import NewArrival from "./newArrival";
import { scrollToTop } from "../../utils/scrollTop";

function NewArrivalSection() {
  const { isLoading, newArrivalProducts } = useProductContext();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section id="feature-products" className="my-20" data-aos="zoom-in-down">
      <div className="container mx-auto px-16">
        <div className="flex justify-center md:justify-between items-center">
          <span className="font-head text-3xl font-semibold text-center">
            New Arrivals
          </span>

          <NavLink
            to="/NewArrival"
            className="hidden uppercase text-sm font-bold md:flex gap-2 "
            onClick={scrollToTop}
          >
            View More
            <span>
              <i className="fa-solid fa-arrow-right-long"></i>
            </span>
          </NavLink>
        </div>
        {newArrivalProducts.length === 0 ? (
          <h2 className="mt-8 text-lg">
            No new arrivals available at this time.
          </h2>
        ) : (
          <div className="flex flex-col gap-y-10  md:flex-row items-center justify-start gap-[4rem] my-10 flex-wrap">
            {newArrivalProducts &&
              newArrivalProducts.slice(0, 8).map((product) => {
                return <NewArrival key={product._id} product={product} />;
              })}
          </div>
        )}
        <NavLink
          to="/NewArrival"
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

export default NewArrivalSection;
