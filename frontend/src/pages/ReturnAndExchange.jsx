import Footer from "../components/Footer";
import Header from "../components/Header";
import PageNavigation from "../components/PageNavigation";

const ReturnAndExchangePage = () => {
  return (
    <>
      <Header />
      <PageNavigation title="Return and Exchange" />

      <section className="mx-auto py-12 px-3 md:px-16">
        <div className="container mx-auto p-6 md:p-12  md:border border shadow-md">
          <h2 className="text-4xl font-semibold mb-8 text-center font-head">
            Return and Exchange Policy
          </h2>

          <div className="mb-8">
            <h3 className="text-2xl font-heading font-semibold mb-4">
              1. Return Policy
            </h3>
            <p>
              Our return policy allows for returns within 30 days of the
              purchase date. Items must be in new and unused condition, with all
              original tags and packaging.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-heading font-semibold mb-4">
              2. Exchange Policy
            </h3>
            <p>
              Exchanges are allowed within 30 days of the purchase date. Items
              must be in new and unused condition, with all original tags and
              packaging.
            </p>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-heading font-semibold mb-4">
              3. Conditions for Return/Exchange
            </h3>
            <ul className="list-disc pl-6">
              <li>Items must be in new and unused condition</li>
              <li>Include all original tags and packaging</li>
              <li>
                Contact our customer support to initiate the return/exchange
                process
              </li>
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-2xl font-heading font-semibold mb-4">
              4. Contact Us
            </h3>
            <p className="text-gray-700">
              If you have any questions or concerns about our return and
              exchange policy, please contact our customer support team at{" "}
              <span className="text-primary">virtualvision@gmail.com</span>.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ReturnAndExchangePage;
