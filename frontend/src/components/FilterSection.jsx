import { useFilterContext } from "../context/filtercontext";

function FilterSection() {
  const {
    all_products,
    filters: { generalCategory, price, maxPrice, minPrice },
    updateFilterValue,
  } = useFilterContext();

  const getUniqueData = (data, property) => {
    let newCategory = data.map((curEl) => {
      return curEl[property];
    });
    return (newCategory = ["All", ...new Set(newCategory)]);
  };

  const categoryOnlyData = getUniqueData(all_products, "generalCategory");

  return (
    <div className="flex flex-col gap-10 w-[229px] sticky top-28 ">
      <div className="flex flex-col ">
        <h3 className="text-xl font-head font-extrabold mb-3">Category</h3>
        <div className="flex flex-col justify-start items-start">
          {categoryOnlyData.map((curEl, index) => {
            return (
              <button
                key={index}
                type="button"
                name="generalCategory"
                value={curEl}
                onClick={updateFilterValue}
                className={`font-bold capitalize ${
                  generalCategory === curEl ? "text-primary" : ""
                }`}
              >
                {curEl}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col ">
        <h3 className="text-xl font-head font-extrabold mb-3">Price</h3>
        <p>Rs. {price}</p>
        <input
          type="range"
          name="price"
          min={minPrice}
          max={maxPrice}
          value={price}
          onChange={updateFilterValue}
        />
      </div>
    </div>
  );
}

export default FilterSection;
