import { useState } from "react";
import { Camera } from "../components/Camera";
import { GlassesSelector } from "../components/GlassesSelector";

function TryOn({ products }) {
  const [selectedGlasses, setSelectedGlasses] = useState("classic");

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* <Header /> */}
        <div className="max-w-3xl mx-auto">
          {/* Glasses Selector */}
          {/* <GlassesSelector
            selectedGlasses={selectedGlasses}
            onSelect={setSelectedGlasses}
          /> */}

          {/* Real-time Camera */}
          <div className="mt-8">
            <Camera glassesType={selectedGlasses} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryOn;
