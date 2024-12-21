import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import withRouter
import axios from "axios";
import AdminMenu from "../../components/AdminPage/AdminMenu";

function AdminOrderDetails() {
  const [orderDetails, setOrderDetails] = useState(null);

  const { orderId } = useParams();
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/orders/${orderId}`);
        setOrderDetails(data);
      } catch (error) {
        console.error("Error fetching order details:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <section className=" flex justify-start items-start gap-10 mb-10 relative">
      <AdminMenu />
      <div className="mt-10 container w-[50rem]">
        {/* <h2 className="text-2xl font-semibold text-center">Orders</h2> */}
        <div className="flex gap-8 items-center mb-4">
          <strong className="text-2xl">Order #{orderDetails._id}</strong>
          <span
            className={` px-2 py-0.5 text-[10px] rounded-full uppercase ${
              orderDetails.status === "delivered"
                ? "bg-gray-300 text-gray-700"
                : orderDetails.status === "paid"
                ? "bg-green-300 text-green-700"
                : orderDetails.status === "cash on delivery"
                ? "bg-green-300 text-green-700"
                : orderDetails.status === "cancelled"
                ? "bg-red-300 text-red-700"
                : ""
            }`}
          >
            {orderDetails.status}
          </span>
        </div>
        <div className="shadow-md">
          <div className="bg-primary px-5 py-2 flex justify-between">
            <span className="text-background">
              Ordered By {orderDetails.customer_information.name}
            </span>
            <span className="text-background">
              {" "}
              Ordered on {new Date(orderDetails.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="px-5 py-2">
            <div>
              {orderDetails.products.map((product) => (
                <div
                  key={product.identity}
                  className="flex items-center gap-2 text-gray-900"
                >
                  {product.product}{" "}
                  <i className="fa-solid fa-circle text-[5px]"></i>{" "}
                  {product.quantity}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-4">
              <div className="flex gap-1 items-center text-gray-500">
                <i className="fa-solid fa-location-dot text-gray-500"></i>
                Delivery Address
              </div>
              <span className="font-semibold"> {orderDetails.address}</span>
            </div>
            <div className="flex gap-2 ">
              <div className="flex gap-1 items-center text-gray-500">
                <i className="fa-solid fa-phone text-gray-500"></i>
                Phone
              </div>
              <span className="font-semibold">
                {" "}
                {orderDetails.customer_information.phone}
              </span>
            </div>
            <div className="mt-4 bg-yellow-200 border border-yellow-300 p-5 flex justify-between items-center">
              <span className="text-yellow-800">
                Total Price Rs.{orderDetails.amount}
              </span>
              <span className="text-yellow-800 flex flex-col">
                <div className="text-yellow-800 uppercase">
                  {orderDetails.payment_method === "khalti"
                    ? `Paid Through Khalti`
                    : orderDetails.status === "delivered"
                    ? "Paid at property"
                    : "Cash on Delivery"}
                </div>
                <div className="text-yellow-800  text-sm">
                  {orderDetails.payment_method === "khalti"
                    ? `Txn_Id: ${orderDetails.transaction_code}`
                    : ""}
                </div>
              </span>
            </div>
            <div
              className={`flex justify-end text-sm text-gray-500 mt-2 ${
                orderDetails.status === "cancelled" ? "text-red-500" : ""
              }`}
            >
              {orderDetails.status === "delivered"
                ? `Delivered on ${new Date(
                    orderDetails.updatedAt
                  ).toLocaleDateString()}`
                : orderDetails.status === "cancelled"
                ? "This ordered is cancelled"
                : "To be delivered"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminOrderDetails;
