import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageNavigation from "../components/PageNavigation";
import { useAuthContext } from "../context/authcontext";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUsPage = () => {
  const [auth, setAuth] = useAuthContext();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (auth?.user) {
      const { email, name } = auth.user;
      setName(name);
      setEmail(email);
    }
  }, [auth?.user]);

  const handleName = (e) => {
    setName(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/contact", { name, email, message });
      if (res.data.success) {
        setMessage("");
        toast.success(res.data.message);
      } else {
        throw new Error(res.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Header />
      <PageNavigation title="Contact Us" />

      <section className="my-10 flex flex-col md:flex-row container mx-auto gap-10  md:gap-20 bg-transparent">
        <div className=" p-6 md:w-[2200px]">
          <div>
            <h2 className="text-6xl font-head font-semibold mb-4">
              Contact Us
            </h2>

            <div className="mb-8">
              <p className="">
                We&lsquo;d love to hear from you! Feel free to reach out to us
                with any questions, concerns, or feedback.
              </p>
            </div>
            {!auth.user ? (
              <div className="flex justify-center items-center h-96 font-head font-semibold drop-shadow-2xl">
                Please login to contact us
              </div>
            ) : (
              <form className="max-w-lg" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Your Name
                  </label>
                  <input
                    className="border border-text rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-primary-300"
                    type="text"
                    value={name}
                    onChange={handleName}
                    id="name"
                    name="name"
                    placeholder="Your Name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Address
                  </label>
                  <input
                    className="border border-text rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-primary-300"
                    type="email"
                    value={email}
                    onChange={handleEmail}
                    id="email"
                    name="email"
                    placeholder="Email Address"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block  text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Your Message
                  </label>
                  <textarea
                    className="border border-text rounded w-full py-2 px-3 focus:outline-none focus:ring focus:border-primary-300"
                    id="message"
                    value={message}
                    onChange={handleMessage}
                    name="message"
                    rows="4"
                    placeholder="Write your message here..."
                  />
                </div>
                <div className="flex justify-end md:justify-start">
                  <button
                    className="bg-primary flex gap-2 items-center  py-2 px-4  hover:bg-primaryShadow transition  "
                    type="submit"
                  >
                    <span className="text-white  font-bold">Send Message</span>
                    <i className="fa-solid fa-paper-plane text-white"></i>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-10 w-full p-6 md:p-0">
          <div>
            <div className="text-xl border-b border-gray-700  w-full pb-3">
              Let&apos;s Connect on Social Media
            </div>
            <div className="flex gap-5 mt-4">
              <i className="fa-brands fa-instagram text-3xl"></i>
              <i className="fa-brands fa-facebook text-3xl"></i>
              <i className="fa-brands fa-whatsapp text-3xl"></i>
            </div>
          </div>

          <div>
            <div className="text-xl border-b border-gray-700  w-full pb-3">
              Contact Details
            </div>
            <div className="flex flex-col gap-5 mt-4">
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-location-dot text-2xl text-secondary"></i>
                <span className="text-text">
                  44600, Thamel, Kathmandu, Nepal
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-phone text-2xl text-secondary"></i>
                <span className="text-text">+977 9841347653</span>
              </div>
              <div className="flex gap-3 items-center">
                <i className="fa-solid fa-envelope text-2xl text-secondary"></i>
                <span className="text-text">glassco@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-2 md:px-16 ">
        {" "}
        <h2 className="text-3xl font-semibold font-head mb-4 text-center">
          Locate Us
        </h2>
        <div className="relative h-80 border-4 border-white shadow-lg">
          <iframe
            className="w-full h-full"
            title="Glass Co"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.6242426785783!2d85.30809717418258!3d27.7121571253717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb191255e5ed59%3A0xa6b329da0d6c716e!2sThamel%2C%20Kathmandu!5e0!3m2!1sen!2snp!4v1705895016045!5m2!1sen!2snp"
            style={{ border: 0 }}
            allowFullScreen
          ></iframe>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default ContactUsPage;
