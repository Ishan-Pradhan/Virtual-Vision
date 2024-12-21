import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuthContext } from "../../context/authcontext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuthContext();

  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));

        if (res.data.user.role === 1) {
          navigate("/dashboard/admin/dashboard");
        } else {
          navigate(location.state || "/");
        }
      } else if (res.data) {
        return toast.error(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Header />
      <div className="flex mt-10  md:w-1/2 mx-5 md:mx-auto border-text border md:border-none shadow-lg md:shadow-2xl justify-between gap-10">
        <img
          src="images/login.jpg"
          alt=""
          className="max-w-80 object-cover brightness-75 hidden md:flex"
          loading="lazy"
        />
        <div className="w-full md:max-w-md mx-auto p-10 md:pl-0 md:py-10 md:pr-10">
          <h1 className="text-center text-3xl font-bold font-head mb-4">
            Login
          </h1>
          <form className="  " onSubmit={handleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Your email
              </label>
              <div className="flex items-center px-2 gap-1 bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-sm ">
                <i className="fa-regular fa-envelope "></i>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="w-full p-2.5 border-none bg-gray-50 focus:outline-none"
                  placeholder="john@email.com"
                  required
                />
              </div>
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Your password
              </label>
              <div className="flex items-center px-2 gap-1 bg-gray-50 shadow-sm border border-gray-300 text-gray-900 text-sm rounded-sm ">
                <i className="fa-solid fa-lock"></i>
                <input
                  type="password"
                  value={password}
                  placeholder="********"
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="w-full p-2.5 border-none bg-gray-50 focus:outline-none "
                  required
                />
              </div>
            </div>

            <div className="flex justify-end ">
              <button
                type="submit"
                className="text-white w-full bg-primary hover:bg-primaryShadow focus:ring-4 focus:outline-secondary  font-medium  text-sm px-8 py-2.5  text-center "
              >
                Login
              </button>
            </div>
            <div className="flex items-center mt-8 gap-1 ">
              <label
                htmlFor="Sign In"
                className="ms-2 text-sm font-medium text-gray-900 "
              >
                Not Registered yet?
              </label>
              <NavLink to="/Register" className="text-secondary text-sm">
                Register Now
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;
