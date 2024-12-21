import UserMenu from "../../components/User/UserMenu";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/authcontext";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [auth, setAuth] = useAuthContext();

  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, [auth?.user]);

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {
      name: name.length < 5 ? "Proper name is required" : "",
      email:
        !email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
          ? "Invalid email format"
          : "",
      password:
        password.length > 0 && password.length < 6
          ? "Password must be at least 6 characters long"
          : "",

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
    try {
      const requestData = {
        name,
        email,
        phone,
        address,
      };

      if (password.length > 0) {
        requestData.password = password;
      }

      const res = await axios.put("/api/v1/auth/profile", requestData);

      if (res.data.success) {
        setAuth({ ...auth, user: res.data?.updatedUser });
        let ls = JSON.parse(localStorage.getItem("auth"));
        ls.user = res.data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success(res.data && res.data.message);
      } else {
        toast.error(res.data.error);
        console.log(res.data.error);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.log(error);
    }
  };
  return (
    <>
      <Header />
      <section className="flex flex-col container mx-auto md:flex-row justify-start items-start gap-10 px-5 md:px-0">
        <UserMenu />
        <form
          className="self-center w-full md:w-[500px] shadow-lg border  p-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Your Profile
          </h2>
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
              placeholder="name@flowbite.com"
              required
              disabled
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
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm focus:primary focus:border-blue-500 block w-full p-2.5 "
              placeholder="Type your new password"
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
            />
          </div>
          <ul className="text-red-500 text-sm mt-1">
            <li>
              {" "}
              {Object.values(errors).map((error, index) => (
                <div className="text-red-500 my-4" key={index}>
                  {error}
                </div>
              ))}
            </li>
          </ul>
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-white bg-primary hover:bg-primaryShadow focus:ring-4 focus:outline-none focus:primary font-medium rounded-sm text-sm px-5 py-2.5 text-center "
            >
              Update your account
            </button>
          </div>
        </form>
      </section>
      <Footer />
    </>
  );
}

export default Profile;
