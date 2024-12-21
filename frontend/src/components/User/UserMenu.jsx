import { NavLink } from "react-router-dom";
import { useAuthContext } from "../../context/authcontext";
import { toast } from "react-toastify";
import { scrollToTop } from "../../utils/scrollTop";

function UserMenu() {
  const [auth, setAuth] = useAuthContext();
  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");

    toast.success("Logged out successfully");
  };
  return (
    <div className="w-full md:w-auto md:max-w-2xl md:sticky md:top-24 ">
      <aside className="w-full md:w-64 ">
        <div className="px-3 py-4 overflow-y-auto border   bg-gray-50">
          <h3 className="text-center mb-4">User Panel</h3>
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/dashboard/user/profile"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-text  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-text   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-user"></i>
                <div>Profile</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/orders"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-text  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-text   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-bag-shopping"></i>
                <div>Orders</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/user/feedback"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-text  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-text   hover:bg-primaryTint2 gap-2"
                }
                onClick={scrollToTop}
              >
                <i className="fa-solid fa-comment"></i>
                <div>Feedbacks</div>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/Login"
                className={({ isActive }) =>
                  isActive
                    ? "flex items-center p-2 text-base font-normal text-text  bg-primaryTint transition delay-50 hover:ease-in gap-2"
                    : " flex items-center p-2 text-base font-normal text-text   hover:bg-primaryTint2 gap-2"
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

export default UserMenu;
