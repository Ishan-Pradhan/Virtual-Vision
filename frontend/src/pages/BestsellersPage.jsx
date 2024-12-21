import Loading from "../components/Loading";
import { useProductContext } from "../context/productcontext";
import Footer from "../components/Footer";
import Pagination from "../components/Pagination";
import FeatureProducts from "../components/FeatureProducts";
import PageNavigation from "../components/PageNavigation";
import Header from "../components/Header";
import { useState } from "react";
import FilterSection from "../components/FilterSection";
import { useFilterContext } from "../context/filtercontext";

function BestsellersPage() {
  const { isLoading, products } = useProductContext();
  const { filter_products } = useFilterContext();

  const bestsellers =
    filter_products.length > 0
      ? filter_products.filter((product) => product.quantitySold >= 5)
      : products.filter((product) => product.quantitySold >= 5);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItems = bestsellers.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsForCurrentPage = bestsellers.slice(startIndex, endIndex);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <Header />
      <PageNavigation title={"Best sellers"} />

      <div className="container px-16 mx-auto">
        <div className="flex flex-col md:flex-row gap-10 justify-start">
          <div className="w-100 justify-center items-center">
            <FilterSection />
          </div>
          <section className="flex flex-col container ">
            <div
              className={`flex flex-col gap-y-14  md:flex-row items-center mb-10 flex-wrap ${
                bestsellers.length <= 3
                  ? "justify-start gap-x-16"
                  : "justify-between"
              }`}
            >
              {productsForCurrentPage.map((product) => (
                <FeatureProducts key={product._id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </section>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </main>
  );
}

export default BestsellersPage;
