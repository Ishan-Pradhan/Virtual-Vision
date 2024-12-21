import FilterSection from "../components/FilterSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import ProductList from "../components/ProductList";
import PageNavigation from "../components/PageNavigation";

function WomenProduct() {
  return (
    <main>
      <Header />
      <PageNavigation title={"Women Products"} />
      <div className="container px-10 md:px-16 mx-auto">
        <div className="flex flex-col md:flex-row gap-10 justify-center md:justify-start">
          <div className="w-100 justify-center items-center">
            <FilterSection />
          </div>

          <section className="flex flex-col container ">
            <div className="flex items-center container">
              <ProductList genderCategory="women" />
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

export default WomenProduct;
