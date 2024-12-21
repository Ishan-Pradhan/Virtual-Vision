import { useState } from "react";
import AdminMenu from "../../components/AdminPage/AdminMenu";
import axios from "axios";
import Button from "../../components/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateProduct() {
  const navigate = useNavigate();
  const [productImg, setProductImg] = useState("");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [featured, setFeatured] = useState(false);
  const [generalCategory, setGeneralCategory] = useState("sunglasses");
  const [genderCategory, setGenderCategory] = useState("unisex");
  const [stock, setStock] = useState(1);
  const [composition, setComposition] = useState("");
  const [weight, setWeight] = useState("");
  const [size, setSize] = useState("");
  const [frameMaterial, setFrameMaterial] = useState("metal");
  const [lensType, setLensType] = useState("single vision");
  const [lensColor, setLensColor] = useState("");
  const [uvProtection, setUvProtection] = useState(false);
  const [prescriptionReady, setPrescriptionReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Image Change
  const handleImageChange = (e) => {
    setProductImg(e.target.files[0]);
  };

  // Handle Input Changes
  const handleNameChange = (e) => setProductName(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handlePriceChange = (e) => setPrice(e.target.value);
  const handleDiscountChange = (e) => setDiscount(e.target.value);
  const handleFeaturedChange = (e) => setFeatured(e.target.checked);
  const handleGeneralCategoryChange = (e) => setGeneralCategory(e.target.value);
  const handleGenderCategoryChange = (e) => setGenderCategory(e.target.value);
  const handleStockChange = (e) => setStock(e.target.value);
  const handleCompositionChange = (e) => setComposition(e.target.value);
  const handleWeightChange = (e) => setWeight(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handleFrameMaterialChange = (e) => setFrameMaterial(e.target.value);
  const handleLensTypeChange = (e) => setLensType(e.target.value);
  const handleLensColorChange = (e) => setLensColor(e.target.value);
  const handleUvProtectionChange = (e) => setUvProtection(e.target.checked);
  const handlePrescriptionReadyChange = (e) =>
    setPrescriptionReady(e.target.checked);

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("productImg", productImg);
      formData.append("productName", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("featured", featured);
      formData.append("generalCategory", generalCategory);
      formData.append("genderCategory", genderCategory);
      formData.append("stock", stock);
      formData.append("composition", composition);
      formData.append("weight", weight);
      formData.append("size", size);
      formData.append("frameMaterial", frameMaterial);
      formData.append("lensType", lensType);
      formData.append("lensColor", lensColor);
      formData.append("uvProtection", uvProtection);
      formData.append("prescriptionReady", prescriptionReady);

      const { data } = await axios.post("/api/v1/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (data.success) {
        // Reset form after successful submission
        setProductImg("");
        setProductName("");
        setDescription("");
        setPrice("");
        setDiscount("");
        setFeatured(false);
        setGeneralCategory("sunglasses");
        setGenderCategory("unisex");
        setStock(1);
        setComposition("");
        setWeight("");
        setSize("");
        setFrameMaterial("metal");
        setLensType("single vision");
        setLensColor("");
        setUvProtection(false);
        setPrescriptionReady(false);
        toast.success("Product created successfully");
        navigate("/dashboard/admin/manage-products");
      }
    } catch (error) {
      toast.error("Failed to create product");
      console.error("Error adding products", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="container flex justify-start items-start gap-10 mb-10 relative">
        <AdminMenu />
        <div className="mt-10 flex flex-col w-full justify-center items-center">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Add Eyewear Product
          </h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="border-2 shadow-lg bg-white p-10 grid grid-cols-1 gap-4 relative mt-5"
          >
            {/* Product Image */}
            <div className="flex gap-10">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="productImg"
              >
                Product Image
              </label>
              <input
                className="col-span-2"
                type="file"
                id="productImg"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>

            {/* Product Name */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="productName"
              >
                Product Name
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="text"
                id="productName"
                value={productName}
                onChange={handleNameChange}
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                className="border border-[#888] col-span-2 px-2 py-1"
                rows="6"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                required
              ></textarea>
            </div>

            {/* Price */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="price"
              >
                Price
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="number"
                id="price"
                value={price}
                onChange={handlePriceChange}
                required
              />
            </div>

            {/* Discount */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="discount"
              >
                Discount (%) (Optional)
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="number"
                id="discount"
                value={discount}
                onChange={handleDiscountChange}
                min="0"
                max="100"
              />
            </div>

            {/* Featured Checkbox */}
            <div className="flex gap-10">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="featured"
              >
                Featured
              </label>
              <div className="col-span-2 px-2 flex gap-3">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={handleFeaturedChange}
                />
                <p>Click to feature this product on the homepage</p>
              </div>
            </div>

            {/* General Category */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="generalCategory"
              >
                General Category
              </label>
              <select
                className="border border-[#888] px-3 py-1 col-span-2"
                id="generalCategory"
                value={generalCategory}
                onChange={handleGeneralCategoryChange}
                required
              >
                <option value="sunglasses">Oval</option>
                <option value="prescription glasses">Triangle </option>
                <option value="reading glasses">Heart</option>
                <option value="sports eyewear">Round</option>
              </select>
            </div>

            {/* Gender Category */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="genderCategory"
              >
                Gender Category
              </label>
              <select
                className="border border-[#888] px-3 py-1 col-span-2"
                id="genderCategory"
                value={genderCategory}
                onChange={handleGenderCategoryChange}
                required
              >
                <option value="men">Men</option>
                <option value="women">Women</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>

            {/* Stock */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="stock"
              >
                Stock
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="number"
                id="stock"
                value={stock}
                onChange={handleStockChange}
                min="1"
                required
              />
            </div>

            {/* Composition */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="composition"
              >
                Composition
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="text"
                id="composition"
                value={composition}
                onChange={handleCompositionChange}
                required
              />
            </div>

            {/* Weight */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="weight"
              >
                Weight
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="text"
                id="weight"
                value={weight}
                onChange={handleWeightChange}
                required
              />
            </div>

            {/* Size */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="size"
              >
                Size
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="text"
                id="size"
                value={size}
                onChange={handleSizeChange}
                required
              />
            </div>

            {/* Frame Material */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="frameMaterial"
              >
                Frame Material
              </label>
              <select
                className="border border-[#888] px-3 py-1 col-span-2"
                id="frameMaterial"
                value={frameMaterial}
                onChange={handleFrameMaterialChange}
                required
              >
                <option value="metal">Metal</option>
                <option value="plastic">Plastic</option>
                <option value="wood">Wood</option>
                <option value="acetate">Acetate</option>
              </select>
            </div>

            {/* Lens Type */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="lensType"
              >
                Lens Type
              </label>
              <select
                className="border border-[#888] px-3 py-1 col-span-2"
                id="lensType"
                value={lensType}
                onChange={handleLensTypeChange}
                required
              >
                <option value="single vision">Single Vision</option>
                <option value="bifocal">Bifocal</option>
                <option value="progressive">Progressive</option>
                <option value="blue light blocking">Blue Light Blocking</option>
              </select>
            </div>

            {/* Lens Color */}
            <div className="flex flex-col mb-2 gap-2">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="lensColor"
              >
                Lens Color (Optional)
              </label>
              <input
                className="border border-[#888] col-span-2 px-2 py-1"
                type="text"
                id="lensColor"
                value={lensColor}
                onChange={handleLensColorChange}
              />
            </div>

            {/* UV Protection */}
            <div className="flex gap-10">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="uvProtection"
              >
                UV Protection
              </label>
              <div className="col-span-2 px-2 flex gap-3">
                <input
                  type="checkbox"
                  id="uvProtection"
                  checked={uvProtection}
                  onChange={handleUvProtectionChange}
                />
                <p>Check if UV protection is included in the lenses</p>
              </div>
            </div>

            {/* Prescription Ready */}
            <div className="flex gap-10">
              <label
                className="text-[#111] font-head font-semibold"
                htmlFor="prescriptionReady"
              >
                Prescription Ready
              </label>
              <div className="col-span-2 px-2 flex gap-3">
                <input
                  type="checkbox"
                  id="prescriptionReady"
                  checked={prescriptionReady}
                  onChange={handlePrescriptionReadyChange}
                />
                <p>Check if the glasses are prescription ready</p>
              </div>
            </div>

            <div className="flex justify-end h-10">
              <Button disabled={isLoading}>Add Product</Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateProduct;
