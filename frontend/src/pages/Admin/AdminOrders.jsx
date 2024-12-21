import axios from "axios";
import AdminMenu from "../../components/AdminPage/AdminMenu";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";

function AdminOrders() {
  const [userOrders, setUserOrders] = useState([]);
  const [displayOption, setDisplayOption] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalItems = filteredOrders.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsForCurrentPage = filteredOrders.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchUserOrders = async () => {
      try {
        const { data } = await axios.get("/api/v1/orders");
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setUserOrders(data);
        filterOrders(data);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      }
    };

    fetchUserOrders();
  }, [userOrders]);

  const filterOrders = (orders) => {
    let filtered = [...orders];
    if (displayOption === "delivered") {
      filtered = orders.filter((order) => order.status === "delivered");
    } else if (displayOption === "paid") {
      filtered = orders.filter((order) => order.status === "paid");
    } else if (displayOption === "cod") {
      filtered = orders.filter((order) => order.status === "cash on delivery");
    } else if (displayOption === "cancelled") {
      filtered = orders.filter((order) => order.status === "cancelled");
    }

    // Apply search query filter
    if (searchQuery) {
      filtered = filtered.filter((order) => order._id.includes(searchQuery));
    }

    setFilteredOrders(filtered);
  };

  const handleDisplayOptionChange = (option) => {
    setDisplayOption(option);
    filterOrders(userOrders);
  };

  const handleStatus = async (orderId, selectedStatus) => {
    try {
      await axios.put(`/api/v1/orders/${orderId}`, { status: selectedStatus });
      const updatedOrders = userOrders.map((order) =>
        order._id === orderId ? { ...order, status: selectedStatus } : order
      );
      setUserOrders(updatedOrders);
      filterOrders(updatedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchInputKeyPress = (e) => {
    if (e.key === "Enter") {
      filterOrders(userOrders);
    }
  };

  return (
    <>
      <section className=" flex justify-start items-start gap-10 mr-8 relative">
        <AdminMenu />
        <div className="mt-10 container mx-auto">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            {" "}
            orders
          </h2>{" "}
          <div className="flex items-center justify-between mb-4 px-10">
            <div>
              <input
                type="text"
                placeholder="Search Order ID"
                value={searchQuery}
                onChange={handleSearchInputChange}
                onKeyPress={handleSearchInputKeyPress}
                className="border border-gray-300  rounded px-2 py-1"
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="displayOption" className="font-semibold">
                Sort:
              </label>
              <select
                id="displayOption"
                value={displayOption}
                onChange={(e) => handleDisplayOptionChange(e.target.value)}
                className="rounded border-2"
              >
                <option value="all">All</option>
                <option value="delivered">Delivered</option>
                <option value="paid">Paid</option>
                <option value="cod">COD</option>
                <option value="cancelled">cancelled</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto text-sm">
            <div className="grid grid-cols-9 mb-5 gap-4 mt-10 px-4 py-2 border-b-2 border-text">
              <span className="font-bold font-head col-span-3">Id</span>
              <span className="font-bold font-head col-span-2">Products</span>
              {/* <span className="font-bold font-head">Quantity</span> */}
              <span className="font-bold font-head">Total Price</span>
              {/* <span className="font-bold font-head">Address</span> */}
              {/* <span className="font-bold font-head">Paid-Through</span> */}
              <span className="font-bold font-head">Status</span>
              <span className="font-bold font-head">Ordered By</span>
              {/* <span className="font-bold font-head">Ordered on</span> */}
            </div>
            {productsForCurrentPage.map((order) => (
              <div
                className={`grid grid-cols-9 border-b-2 px-4 py-4 gap-4 items-center  ${
                  order.status === "cancelled" ? "bg-red-200" : ""
                }`}
                key={order._id}
              >
                <div className="col-span-3 flex flex-col">
                  <span>
                    <span className="font-bold">Order_Id </span>
                    {order._id}
                  </span>
                  {order.status === "paid" ? (
                    <span>
                      <span className="font-bold">Txn_Id</span>{" "}
                      {order.transaction_code}
                    </span>
                  ) : (
                    ""
                  )}
                  <span className="mt-2">
                    <span className="text-sm">
                      Order on: {new Date(order.createdAt).toLocaleDateString()}
                    </span>{" "}
                  </span>
                </div>
                <div className="flex flex-col col-span-2">
                  {order.products.map((product) => (
                    <span key={product.identity}>{product.product}</span>
                  ))}
                </div>
                {/* <div className="flex flex-col">
                  {order.products.map((product) => (
                    <span key={product.identity}>{product.quantity}</span>
                  ))}
                </div> */}

                <span> {order.amount}</span>
                {/* <span>{order.address}</span>
                <span>{order.payment_method}</span> */}
                <div>
                  <select
                    className={`px-2 py-1 rounded text-center ${
                      order.status === "paid"
                        ? "bg-green-300 text-green-800"
                        : order.status === "delivered"
                        ? "bg-slate-300 text-slate-800"
                        : order.status === "cancelled"
                        ? "bg-red-300 text-red-800 font-thin"
                        : "bg-gray-200 text-gray-800"
                    }`}
                    onChange={(e) => handleStatus(order._id, e.target.value)}
                    value={order.status}
                    disabled={
                      order.status === "cancelled" ||
                      order.status === "delivered"
                    }
                  >
                    <option value="cash on delivery">COD</option>
                    <option value="paid">paid</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>

                <div>
                  <div>{order.customer_information.name}</div>(
                  {order.customer_information.phone})
                </div>
                {/* <div>{new Date(order.createdAt).toLocaleDateString()}</div> */}
                <Link to={`/dashboard/admin/adminorders/${order._id}`}>
                  <button className="group text-secondary font-bold  hover:underline transition-all duration-300">
                    {/* <i className="fa-solid fa-arrow-right text-lg group-hover:text-primary transition-all duration-300 group-hover:translate-x-2"></i> */}
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="mr-8 mb-8">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default AdminOrders;
