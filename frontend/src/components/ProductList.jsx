import { useState } from "react";
import { useFilterContext } from "../context/filtercontext"; // Assuming you have a context for glasses
import FeatureProducts from "./FeatureProducts";
import Pagination from "./Pagination";

/* eslint-disable react/prop-types */
function ProductList({
  generalCategory,
  genderCategory,
  frameMaterial,
  lensType,
  lensColor,
}) {
  const { filter_products } = useFilterContext();

  // Filter products based on available categories and filters
  const filteredProducts = filter_products.filter((product) => {
    const matchesGeneralCategory =
      generalCategory !== "All"
        ? product.generalCategory === generalCategory
        : true;
    const matchesGender =
      genderCategory !== "All"
        ? product.genderCategory === genderCategory
        : true;
    const matchesFrameMaterial = frameMaterial
      ? product.frameMaterial === frameMaterial
      : true;
    const matchesLensType = lensType ? product.lensType === lensType : true;
    const matchesLensColor = lensColor ? product.lensColor === lensColor : true;

    return (
      matchesGeneralCategory &&
      matchesGender &&
      matchesFrameMaterial &&
      matchesLensType &&
      matchesLensColor
    );
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsForCurrentPage = filteredProducts.slice(startIndex, endIndex);

  if (productsForCurrentPage.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p>No products to show</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="flex gap-y-20 md:gap-y-10 flex-wrap items-center justify-center md:justify-start gap-[4.8rem] container">
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
    </div>
  );
}

export default ProductList;
