import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: name.length < 5 ? "Proper name is required" : "",
      email:
        !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Invalid email format"
          : "",
      password:
        !password.trim() || password.length < 6
          ? "Password must be at least 6 characters long"
          : "",
      confirmPassword:
        password !== confirmPassword ? "Passwords do not match" : "",
      phone:
        phone.length < 10 ||
        !/^(98|97|96|95|94|93|92|91|90|89|88|87|86|85|84|83|82|81|80)\d{8}$/.test(
          phone
        )
          ? "Invalid phone number"
          : "",
      address: !address.trim() ? "Address is required" : "",
    };

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error !== "")) {
      return;
    }

    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
      });
      if (res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/Login");
      } else {
        return toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error(error.response.data.message);
        console.log(error);
      } else {
        toast.error("An error occurred while processing your request.");
      }
    }
  };
  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto border-2 mt-10  shadow-xl p-10">
        <h1 className="text-center text-3xl font-bold font-head mb-4">
          Register Page
        </h1>

        <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:primary focus:border-primary block w-full p-2.5"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Your email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:primary focus:border-blue-500 block w-full p-2.5"
              placeholder="youremail@email.com"
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="******"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:primary focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="repeat-password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Repeat password
            </label>
            <input
              type="password"
              id="repeat-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="******"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:primary focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:primary focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:primary focus:border-blue-500 block w-full p-2.5 "
              required
            />
          </div>

          <div className="text-red-500 text-sm mt-1">
            {Object.values(errors).map((error, index) => (
              <div className="text-red-500 my-4" key={index}>
                {error}
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-8 mb-5 w-full">
            <button
              type="submit"
              className="text-white w-full bg-primary hover:bg-primaryShadow focus:ring-4 focus:outline-none focus:primary font-medium  text-sm px-5 py-2.5 text-center "
            >
              Register new account
            </button>
          </div>
          <div className="flex items-center justify-center  gap-1">
            <label
              htmlFor="Sign In"
              className="ms-2 text-sm font-medium text-gray-900 "
            >
              Already have an account?
            </label>
            <NavLink to="/Login" className="text-secondary">
              Sign In
            </NavLink>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default Register;
