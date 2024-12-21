import { useState } from "react";
import { CameraNav } from "../components/CameraNav";
import { GlassesSelector } from "../components/GlassesSelector";
import { useProductContext } from "../context/productcontext";

function TryOnNav() {
  const { products } = useProductContext();
  const [selectedGlasses, setSelectedGlasses] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">Virtual Glasses Try-On</h1>
        <div className="max-w-3xl mx-auto">
          {/* Glasses Selector */}
          <GlassesSelector
            selectedGlasses={selectedGlasses}
            onSelect={setSelectedGlasses}
            products={products}
          />

          {/* Real-time Camera */}
          <div className="mt-8">
            <CameraNav glassesType={selectedGlasses} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryOnNav;
