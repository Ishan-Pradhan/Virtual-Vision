import { useState } from "react";
import AdminMenu from "../../components/AdminPage/AdminMenu";
import { useProductContext } from "../../context/productcontext";
import { NavLink } from "react-router-dom";
import { scrollToTop } from "../../utils/scrollTop";
import Pagination from "../../components/Pagination";

// Updated categories for eyewear
const generalCategoryOptions = [
  "sunglasses",
  "prescription glasses",
  "reading glasses",
  "sports eyewear",
];
const genderCategoryOptions = ["men", "women", "unisex"];
const frameMaterialOptions = ["metal", "plastic", "wood", "acetate"];
const lensCategoryOptions = [
  "single vision",
  "bifocal",
  "progressive",
  "blue light blocking",
];

function ManageProducts() {
  const { products } = useProductContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [showZeroStock, setShowZeroStock] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedFrameMaterial, setSelectedFrameMaterial] = useState("all");
  const [selectedLensType, setSelectedLensType] = useState("all");

  const filteredProducts = products.filter(
    (product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "all" ||
        product.generalCategory === selectedCategory) &&
      (selectedGender === "all" || product.genderCategory === selectedGender) &&
      (selectedFrameMaterial === "all" ||
        product.frameMaterial === selectedFrameMaterial) &&
      (selectedLensType === "all" || product.lensType === selectedLensType) &&
      (showZeroStock ? product.stock === 0 : true)
  );

  const toggleShowZeroStock = () => {
    setShowZeroStock(!showZeroStock);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleFrameMaterialChange = (e) => {
    setSelectedFrameMaterial(e.target.value);
  };

  const handleLensTypeChange = (e) => {
    setSelectedLensType(e.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItems = filteredProducts.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsForCurrentPage = filteredProducts.slice(startIndex, endIndex);

  return (
    <>
      <section className="container flex justify-start items-start gap-10 ">
        <AdminMenu />
        <div className="mt-10">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Manage Products
          </h2>

          <div className="flex flex-col justify-center mb-4">
            <div className="flex justify-between items-center">
              <input
                type="text"
                placeholder="Search by product name..."
                className="border border-gray-300 px-2 py-1 rounded mb-4"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                value={selectedCategory}
                onChange={handleCategoryChange}
                className="border border-gray-300 p-2 rounded-md mb-4"
              >
                <option value="all">All Categories</option>
                {generalCategoryOptions.map((category) => (
                  <option value={category} key={category}>
                    {category}
                  </option>
                ))}
              </select>

              <select
                value={selectedGender}
                onChange={handleGenderChange}
                className="border border-gray-300 p-2 rounded-md mb-4"
              >
                <option value="all">All Genders</option>
                {genderCategoryOptions.map((gender) => (
                  <option value={gender} key={gender}>
                    {gender}
                  </option>
                ))}
              </select>

              <select
                value={selectedFrameMaterial}
                onChange={handleFrameMaterialChange}
                className="border border-gray-300 p-2 rounded-md mb-4"
              >
                <option value="all">All Frame Materials</option>
                {frameMaterialOptions.map((material) => (
                  <option value={material} key={material}>
                    {material}
                  </option>
                ))}
              </select>

              <select
                value={selectedLensType}
                onChange={handleLensTypeChange}
                className="border border-gray-300 p-2 rounded-md mb-4"
              >
                <option value="all">All Lens Types</option>
                {lensCategoryOptions.map((lens) => (
                  <option value={lens} key={lens}>
                    {lens}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={showZeroStock}
                onChange={toggleShowZeroStock}
                className="mr-2"
              />
              Show products with 0 stock
            </label>

            <div
              className={`grid grid-cols-5 gap-10 justify-center border-b-2 mb-10 mt-10 p-2 border-text`}
            >
              <span className="font-bold">Product</span>
              <span className="font-bold">Product Name</span>
              <span className="font-bold">Gender Category</span>
              <span className="font-bold">Frame Material</span>
              <span className="font-bold">Stock Left</span>
            </div>

            {productsForCurrentPage.map((product) => {
              return (
                <div
                  className={`grid grid-cols-5 gap-10 justify-center items-center flex-wrap py-10 px-2 border-b`}
                  key={product._id}
                >
                  <div className="h-32 w-32 overflow-hidden">
                    <img
                      className="h-full w-full object-contain"
                      src={product.productImg}
                      alt=""
                    />
                  </div>
                  <span>{product.productName}</span>
                  <span>{product.genderCategory}</span>
                  <span>{product.frameMaterial}</span>
                  <span
                    className={` ${product.stock === 0 ? "text-red-500" : ""}`}
                  >
                    {product.stock}
                  </span>
                  <NavLink
                    to={`/dashboard/admin/manage-product/${product._id}`}
                    className="text-secondary font-bold hover:underline uppercase"
                    onClick={scrollToTop}
                  >
                    update
                  </NavLink>
                </div>
              );
            })}
            <Pagination
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              totalItems={totalItems}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default ManageProducts;
