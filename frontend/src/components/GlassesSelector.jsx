import { useProductContext } from "../context/productcontext";

export function GlassesSelector({ selectedGlasses, onSelect }) {
  const { isLoading, products } = useProductContext();

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (!products || products.length === 0) {
    return <p>No products available.</p>;
  }

  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      {products.map((product) => (
        <button
          key={product._id}
          onClick={() => onSelect(product)}
          className={`flex flex-col items-center px-4 py-2 rounded-lg border ${
            selectedGlasses?._id === product._id
              ? "bg-blue-500 text-white"
              : "bg-white text-gray-800 hover:bg-gray-100"
          }`}
        >
          <img
            src={product.productImg}
            alt={product.productName}
            className="w-16 h-16 object-contain mb-2"
          />
          <span>{product.productName}</span>
        </button>
      ))}
    </div>
  );
}
