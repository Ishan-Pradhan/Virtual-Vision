import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import "../index.css";
import { useCartContext } from "../context/cartcontext";
import { useAuthContext } from "../context/authcontext";
import { useEffect, useState } from "react";
import { useFilterContext } from "../context/filtercontext";

function Header() {
  const { total_item } = useCartContext();
  const [auth] = useAuthContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showform, setShowform] = useState(false);

  const showForm = () => {
    setShowform(!showform);
  };
  const {
    filters: { text },
    updateFilterValue,
  } = useFilterContext();

  const { filter_products } = useFilterContext();
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    updateFilterValue("");
  };

  const handleInputChange = (event) => {
    updateFilterValue(event);
    setShowModal(true);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showModal && !event.target.closest(".modal-content")) {
        closeModal();
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showModal]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <nav
      className={` container  mx-auto px-10 py-4 z-50 transition-all duration-250 ease-in  flex md:flex-row justify-center relative md:px-0 ${
        isScrolled ? " w-full bg-background h-full " : ""
      }`}
    >
      <div
        className={`w-full ${
          isScrolled
            ? "bg-background shadow-md bg-opacity-100 fixed py-4 top-0 h-auto z-50 stickyheader"
            : ""
        }`}
      >
        <div
          className={`flex items-center justify-between gap-5 mx-auto z-50 ${
            isScrolled ? "px-10" : ""
          }`}
        >
          <div className="md:hidden cursor-pointer text-2xl">
            <i className="fa-solid fa-bars" onClick={toggleMobileMenu}></i>
          </div>

          {isMobileMenuOpen && (
            <div
              className={`md:hidden fixed top-0 left-0 w-full h-full bg-background z-50 transition-all ease-in duration-300 mobile-menu ${
                isMobileMenuOpen
                  ? "opacity-100 pointer-events-auto"
                  : "opacity-0 pointer-events-none"
              }`}
            >
              {/* Mobile Menu Content */}
              <div className="flex flex-col items-start p-8 bg-background">
                <NavLink
                  to="#"
                  className="text-text text-xl hover:text-primary border-b-2 w-full py-3 flex gap-4 items-center"
                  onClick={scrollToTop}
                >
                  <i className="fa-solid fa-venus"></i>
                  Shop
                </NavLink>

                <NavLink
                  to="/returnandexchange"
                  className="text-text text-xl hover:text-primary border-b-2 w-full py-3 flex gap-4 items-center"
                  onClick={scrollToTop}
                >
                  <i className="fa-solid fa-right-left"></i>
                  Return and Exchange
                </NavLink>
                <NavLink
                  to="/contactus"
                  className="text-text text-xl hover:text-primary border-b-2 w-full py-3 flex gap-4 items-center"
                  onClick={scrollToTop}
                >
                  <i className="fa-solid fa-phone"></i>
                  Contact us
                </NavLink>
                <NavLink
                  to={
                    !auth.user
                      ? "/Login"
                      : auth.user.role === 0
                      ? "/dashboard/user"
                      : "/dashboard/admin"
                  }
                  className="text-text text-xl hover:text-primary border-b-2 w-full py-3 flex gap-4 items-center"
                  onClick={scrollToTop}
                >
                  <i className="fa-solid fa-user"></i>
                  {auth.user ? auth.user.name : "Login"}
                </NavLink>
              </div>

              {/* Close Mobile Menu Button */}
              <div className="absolute top-4 right-4 cursor-pointer text-2xl">
                <i className="fa-solid fa-times" onClick={toggleMobileMenu}></i>
              </div>
            </div>
          )}
          <div className="logoandlinks flex gap-4">
            <div className="z-30">
              <Logo />
            </div>

            <div className="hidden items-center  font-bold  gap-5 text-text md:flex">
              <NavLink
                to="/MenProduct"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary transition delay-50 hover:ease-in"
                    : "transition text-text delay-50 hover:text-primary hover:ease-in"
                }
                onClick={scrollToTop}
              >
                Shop
              </NavLink>
              <NavLink
                to="/TryOn"
                className={({ isActive }) =>
                  isActive
                    ? "text-primary transition delay-50 hover:ease-in uppercase"
                    : "transition text-text delay-50 hover:text-primary hover:ease-in uppercase"
                }
                onClick={scrollToTop}
              >
                Try it on
              </NavLink>
            </div>
          </div>

          <div className="flex items-center md:gap-5">
            {!auth.user ? (
              <div className="flex items-center gap-1">
                <NavLink to={"/Login"} onClick={scrollToTop}>
                  <button className="hidden text-md  font-bold  text-secondary hover:text-primary  cursor-pointer transition delay-50 hover-ease-in md:flex uppercase">
                    Login
                  </button>
                  {/* <button className="hidden text-lg  py-1 px-3 font-semibold  bg-secondary text-background hover:bg-primary  cursor-pointer transition delay-50 hover-ease-in md:flex">
                    Login
                  </button> */}
                </NavLink>
                {/* <i className="fa-solid fa-grip-lines-vertical"></i> */}
                <span className="hidden md:flex font-extrabold">/</span>
                <NavLink to={"/Register"} onClick={scrollToTop}>
                  <button className="hidden text-md text-text font-bold  hover:text-primary  cursor-pointer transition delay-50 hover-ease-in md:flex uppercase">
                    Register
                  </button>
                  {/* <button className="hidden text-lg text-text font-semibold py-1 px-3 ring-2 ring-secondary ring-inset  hover:bg-secondaryTint  cursor-pointer transition delay-50 hover-ease-in md:flex">
                    Register
                  </button> */}
                </NavLink>
              </div>
            ) : auth.user.role === 0 ? (
              <NavLink to={"/dashboard/user/profile"} onClick={scrollToTop}>
                <button className="hidden text-lg  py-1 px-3 font-semibold  text-text hover:ring-1 hover:ring-inset hover:ring-primary group  cursor-pointer transition delay-50 hover-ease-in md:flex items-center gap-2">
                  <i className="fa-solid fa-user group-hover:text-primary"></i>{" "}
                  <span className="group-hover:text-primary">
                    {auth.user.name}
                  </span>
                </button>
              </NavLink>
            ) : (
              <NavLink to={"/dashboard/admin"} onClick={scrollToTop}>
                <button className="text-lg  py-1 px-3 font-semibold  bg-secondary text-background hover:bg-primary  cursor-pointer transition delay-50 hover-ease-in md:flex">
                  {auth.user.name}
                </button>
              </NavLink>
            )}
            <div className="flex gap-x-4 items-center" onClick={showForm}>
              <i className="fa-solid fa-magnifying-glass text-2xl md:hidden"></i>
              <NavLink to="/Cart" className="relative" onClick={scrollToTop}>
                <i className="fa-solid fa-cart-shopping z-30 hover:text-primary cursor-pointer transition delay-50 hover-ease-in text-2xl"></i>
                <div
                  className={`text-[12px] bg-primary text-background absolute w-5 h-5 -top-2 -right-3 rounded-full p-1 flex justify-center items-center ${
                    total_item > 0 ? "motion-safe:animate-bounce" : ""
                  }`}
                >
                  {total_item}
                </div>
              </NavLink>
            </div>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`relative w-72 mx-auto mt-10  md:hidden ${
            showform ? "flex" : "hidden"
          }`}
        >
          <input
            type="text"
            name="text"
            value={text}
            placeholder="Search products..."
            onChange={handleInputChange}
            className="border border-text px-4 w-full font-medium "
          />

          {showModal && text && (
            <div className="absolute top-full left-0 w-full z-50 modal-content shadow-lg mt-4 ">
              <div className="bg-white  w-full p-4">
                <ul className="flex flex-col ">
                  {filter_products.length > 0 ? (
                    filter_products.map((product) => (
                      <NavLink
                        to={`/SingleProducts/${product._id}`}
                        key={product._id}
                        className="flex gap-1 border-b py-1 items-center group"
                      >
                        <img
                          src={product.productImg}
                          alt=""
                          className="w-10 h-10 object-cover"
                        />
                        <p className="group-hover:text-primary">
                          {product.productName}
                        </p>
                      </NavLink>
                    ))
                  ) : (
                    <p>no products found</p>
                  )}
                </ul>
              </div>
            </div>
          )}
        </form>
      </div>
    </nav>
  );
}

export default Header;
