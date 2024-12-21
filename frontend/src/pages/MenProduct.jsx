import FilterSection from "../components/FilterSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import PageNavigation from "../components/PageNavigation";

function GlassesProduct() {
  return (
    <main>
      <Header />
      <PageNavigation title={"Glasses Products"} />
      <div className="container px-10 md:px-16 mx-auto">
        <div className="flex flex-col md:flex-row gap-10 justify-center md:justify-start">
          <div className="w-full md:w-1/5 justify-center items-center">
            {/* Filter section for all glasses */}
            <FilterSection />
          </div>

          <section className="flex flex-col container md:w-4/5">
            <div className="flex items-center container">
              {/* Product List for all glasses categories and genders */}
              <ProductList generalCategory="All" genderCategory="All" />
            </div>
          </section>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </main>
  );
}

export default GlassesProduct;
