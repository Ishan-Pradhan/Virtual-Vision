import { useState } from "react";
import { GlassesSelector } from "./GlassesSelector";

export function FaceFilter() {
  const [faceCategoryFilter, setFaceCategoryFilter] = useState("");

  // Handle face category change
  const handleFaceCategoryChange = (e) => {
    setFaceCategoryFilter(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
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

      {/* GlassesSelector with the selected face category filter */}
      <GlassesSelector
        selectedGlasses={null} // Add logic for selecting glasses if needed
        onSelect={(product) => console.log("Selected product:", product)}
        faceCategoryFilter={faceCategoryFilter}
      />
    </div>
  );
}
