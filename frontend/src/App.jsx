import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WomenProduct from "./pages/WomenProduct";
import MenProduct from "./pages/MenProduct";
import Cart from "./pages/Cart";
import SingleProducts from "./pages/SingleProducts";
import AboutUs from "./pages/AboutUs";
import ReturnAndExchange from "./pages/ReturnAndExchange";
import ContactUs from "./pages/ContactUs";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import PrivateRoute from "./components/Routes/Private";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminRoute from "./components/Routes/AdminRoute";

import Users from "./pages/Admin/Users";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";

import ManageProducts from "./pages/Admin/ManageProducts";
import UpdateProducts from "./pages/Admin/UpdateProducts";
import Feedbacks from "./pages/Admin/Feedbacks";
import SingleFeedback from "./pages/Admin/SingleFeedback";
import UserFeedback from "./pages/user/UserFeedback";
import UpdateUsers from "./pages/Admin/UpdateUsers";
import CreateProduct from "./pages/Admin/CreateProduct";
import PaymentSuccess from "./components/PaymentSuccess";

import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import AdminOrders from "./pages/Admin/AdminOrders";
import NotFound from "./pages/NotFound";
import NewArrivalPage from "./pages/NewArrivalPage";
import BestsellersPage from "./pages/BestsellersPage";
import AdminOrdersDetail from "./pages/Admin/AdminOrdersDetail";

import TryOn from "./pages/TryOn";
import TryOnNav from "./pages/TryOnNav";

function App() {
  useEffect(() => {
    Aos.init({
      once: true,
      startEvent: "DOMContentLoaded",
      easing: "ease-in-out",
      duration: 700,
    });
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/WomenProduct" element={<WomenProduct />}></Route>
        <Route path="/MenProduct" element={<MenProduct />}></Route>
        <Route path="/NewArrival" element={<NewArrivalPage />}></Route>
        <Route path="/Bestsellers" element={<BestsellersPage />}></Route>
        <Route path="/Register" element={<Register />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/success" element={<PaymentSuccess />}></Route>
        <Route path="/*" element={<NotFound />}></Route>

        <Route path="Dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Profile />} />
          <Route path="user/orders" element={<Order />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/feedback" element={<UserFeedback />} />
        </Route>
        <Route path="Dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/manage-products" element={<ManageProducts />} />
          <Route path="admin/manage-product/:id" element={<UpdateProducts />} />
          <Route path="admin/feedbacks" element={<Feedbacks />} />
          <Route path="admin/feedbacks/:id" element={<SingleFeedback />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/adminorders" element={<AdminOrders />} />
          <Route
            path="admin/adminorders/:orderId"
            element={<AdminOrdersDetail />}
          />
          <Route path="admin/users/:id" element={<UpdateUsers />} />
        </Route>

        <Route path="/AboutUs" element={<AboutUs />}></Route>
        <Route
          path="/ReturnAndExchange"
          element={<ReturnAndExchange />}
        ></Route>
        <Route path="/ContactUs" element={<ContactUs />}></Route>
        <Route path="/Cart" element={<Cart />}></Route>
        <Route path="/SingleProducts/:id" element={<SingleProducts />}></Route>
        <Route path="/TryOn" element={<TryOn />}></Route>
        <Route path="/TryOnNav" element={<TryOnNav />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
