import GridCategories from "../GridCategories";

function GridCategoriesSection({ scrollToTop }) {
  return (
    <section id="grid-categories" className="my-20 " data-aos="fade-down">
      <div className="container mx-auto px-16 flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-0 ">
        <div className="col-span-1 row-span-2 h-[300px] md:h-[600px] rounded-3xl overflow-hidden md:m-3">
          <GridCategories
            images={"images/grid1.jpg"}
            title={"Shawl"}
            scrollToTop={scrollToTop}
          />
        </div>
        <div className="col-span-1 h-[300px] rounded-3xl overflow-hidden md:m-3">
          <GridCategories
            images={"images/grid2.jpg"}
            title={"scarves"}
            scrollToTop={scrollToTop}
          />
        </div>
        <div className="col-span-1 row-span-2 h-[300px] md:h-[600px] rounded-3xl overflow-hidden md:m-3">
          <GridCategories
            images={"images/grid3.jpg"}
            title={"Blankets"}
            scrollToTop={scrollToTop}
          />
        </div>
        <div className="col-span-1  h-[300px] rounded-3xl overflow-hidden row-span-3 mb-1 md:mx-3 ">
          <GridCategories
            images={"images/grid4.jpg"}
            title={"poncho"}
            scrollToTop={scrollToTop}
          />
        </div>
      </div>
    </section>
  );
}

export default GridCategoriesSection;
