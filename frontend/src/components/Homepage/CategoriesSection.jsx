import Categories from "../categories";

const catImages = [
  "images/categories1.jpg",
  "images/categories2.jpg",
  "images/categories3.jpg",
];

function CategoriesSection() {
  return (
    <section id="categories" className="my-20" data-aos="zoom-in-down">
      <div className="px-5 container mx-auto relative flex flex-col md:px-16">
        {/* categories title */}
        <div className="flex justify-center md:justify-between items-center">
          <span className="font-head text-3xl font-semibold text-center">
            Explore by categories
          </span>
          <span className="hidden md:flex "></span>
        </div>
        <div className="flex flex-col gap-5 md:flex-row my-10 w-full ">
          <Categories images={catImages[0]}>New Arrivals</Categories>
          <Categories images={catImages[1]}>Best Sellers</Categories>
          <Categories images={catImages[2]}>Men&apos;s Collection</Categories>
        </div>
        <span className="flex items-center justify-center md:hidden "></span>
      </div>
    </section>
  );
}

export default CategoriesSection;
