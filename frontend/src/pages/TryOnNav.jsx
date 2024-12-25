import { useState } from "react";
import { CameraNav } from "../components/CameraNav";
import Header from "../components/Header";
import { GlassesSelector } from "../components/GlassesSelector";
import { useProductContext } from "../context/productcontext";

function TryOnNav() {
  const { products } = useProductContext();
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [faceCategoryFilter, setFaceCategoryFilter] = useState("");

  // Handle face category change
  const handleFaceCategoryChange = (e) => {
    setFaceCategoryFilter(e.target.value);
  };

  // Filter products based on faceCategoryFilter
  const filteredProducts = faceCategoryFilter
    ? products.filter((product) => product.faceCategory === faceCategoryFilter)
    : products;

  console.log(filteredProducts); // For debugging, check what products are being passed

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold  text-center my-20">
            Virtual Glasses Try-On
          </h1>
          <div className="max-w-3xl mx-auto">
            {/* Dropdown for selecting face category */}
            <div className="mb-4">
              <label htmlFor="faceCategory" className="mr-2 font-semibold">
                Select Face Category:
              </label>
              <select
                id="faceCategory"
                value={faceCategoryFilter}
                onChange={handleFaceCategoryChange}
                className="border px-3 py-1"
              >
                <option value="">All Categories</option>
                <option value="oval">Oval</option>
                <option value="round">Round</option>
                <option value="square">Square</option>
                <option value="heart-shaped">Heart-shaped</option>
                <option value="diamond">Diamond</option>
                <option value="triangle">Triangle</option>
              </select>
            </div>

            {/* Glasses Selector */}
            <GlassesSelector
              selectedGlasses={selectedGlasses}
              onSelect={setSelectedGlasses}
              products={filteredProducts}
            />

            {/* Real-time Camera */}
            <div className="my-8">
              <CameraNav glassesType={selectedGlasses} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TryOnNav;
