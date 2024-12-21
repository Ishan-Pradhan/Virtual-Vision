import Footer from "../components/Footer";
import Header from "../components/Header";
import PageNavigation from "../components/PageNavigation";
import { useProductContext } from "../context/productcontext";
import { useState } from "react";
import NewArrival from "../components/Homepage/newArrival";
import Pagination from "../components/Pagination";
import Loading from "../components/Loading";
import FilterSection from "../components/FilterSection";
import { useFilterContext } from "../context/filtercontext";

function NewArrivalPage() {
  const { isLoading, newArrivalProducts } = useProductContext();
  const { filters } = useFilterContext();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const applyFilters = (products) => {
    let filteredProducts = [...products];

    if (filters.generalCategory !== "All") {
      filteredProducts = filteredProducts.filter(
        (product) => product.generalCategory === filters.generalCategory
      );
    }

    if (filters.price !== 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.price <= filters.price
      );
    }

    return filteredProducts;
  };

  const filteredNewArrivalProducts = applyFilters(newArrivalProducts);

  const totalItems = filteredNewArrivalProducts.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsForCurrentPage = filteredNewArrivalProducts.slice(
    startIndex,
    endIndex
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main>
      <Header />
      <PageNavigation title={"New Arrivals"} />

      <div className="container px-16 mx-auto">
        <div className="flex flex-col md:flex-row gap-10 justify-start">
          <div className="w-100 justify-center items-center">
            <FilterSection />
          </div>

          <section className="flex flex-col container ">
            <div className="flex items-center justify-center md:justify-between gap-16 flex-wrap container">
              {productsForCurrentPage.map((product) => (
                <NewArrival key={product._id} product={product} />
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

export default NewArrivalPage;
