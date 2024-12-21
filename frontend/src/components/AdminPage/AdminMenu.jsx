import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext";
import { toast } from "react-toastify";
import Logo from "../Logo";
import { scrollToTop } from "../../utils/scrollTop";

function AdminMenu() {
  const [auth, setAuth] = useAuthContext();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");

    toast.success("Logged out successfully");
  };
  return (
    <div className="max-w-2xl">
      <aside className="w-64 " aria-label="Sidebar">
        <div className="px-3 w-64 py-4 overflow-y-auto border bg-gray-50 fixed h-full">
          <div className="flex items-center justify-center my-5">
            <Logo />
          </div>
          <h3 className="text-center mb-4 font-bold text-xl font-head">
            Admin Panel
          </h3>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/admin/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-gray-900  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-gray-900   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-chart-line"></i>
                <div>Dashboard</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/create-product"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-gray-900  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-gray-900   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-plus"></i>
                <div>Add Product</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/manage-products"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-gray-900  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-gray-900   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-pen-to-square"></i>
                <div>Manage Products</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/users"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-gray-900  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-gray-900   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-users"></i>
                <div>Users</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/feedbacks"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-gray-900  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-gray-900   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-comment"></i>
                <div>Feedbacks</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/admin/adminorders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-gray-900  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-gray-900   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-bag-shopping"></i>
                <div>Orders</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-gray-900  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-gray-900   hover:bg-primaryTint2 gap-2"
                }
                onClick={handleLogout}
              >
                <i className="fa-solid fa-right-from-bracket"></i>
                <div>Logout</div>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}

export default AdminMenu;
