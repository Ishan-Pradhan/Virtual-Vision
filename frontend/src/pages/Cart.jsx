import Header from "../components/Header";
import Footer from "../components/Footer";
import PageNavigation from "../components/PageNavigation";
import CartProductList from "../components/Cartpage/CartProductList";

function Cart() {
  return (
    <>
      <Header />
      <PageNavigation title={"Cart"} />
      <section className="container mx-auto px-6 md:px-16">
        <div className="flex justify-center items-center">
          <CartProductList />
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
