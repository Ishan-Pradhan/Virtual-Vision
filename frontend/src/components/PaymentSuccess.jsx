import Footer from "./Footer";
import Header from "./Header";
function PaymentSuccess() {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center h-[40lvh]">
        <p>Your payment was successful ✅</p>
        <p>Thank you for shopping with us. </p>
      </div>
      <Footer />
    </>
  );
}

export default PaymentSuccess;
