import Header from "../components/Header";

import HeroSection from "../components/Homepage/HeroSection";
// import CategoriesSection from "../components/Homepage/CategoriesSection";
import Features from "../components/Homepage/Features";
import GridCategoriesSection from "../components/Homepage/GridCategoriesSection";
import FeaturedProductsSection from "../components/Homepage/FeaturedProductsSection";
import TestimonialSection from "../components/Homepage/testimonialSection";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import NewArrivalSection from "../components/Homepage/NewArrivalSection";
import BestsellersSection from "../components/Homepage/BestsellersSection";
import CategoriesSection from "../components/Homepage/CategoriesSection";

function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="relative">
      <Header />
      <HeroSection />
      {/* <Features /> */}
      {/* <GridCategoriesSection scrollToTop={scrollToTop} /> */}
      {/* <CategoriesSection /> */}
      <FeaturedProductsSection />
      <NewArrivalSection />
      <BestsellersSection />
      {/* <TestimonialSection /> */}
      <Footer />
      <button
        onClick={scrollToTop}
        className={
          window.scrollY > 700
            ? `p-4 h-12 w-12 rounded-full bg-secondary  fixed bottom-10 right-6 flex items-center justify-center shadow-xl group transition-all ease-in-out duration-1000 opacity-100`
            : `hidden`
        }
        data-aos="fade-up"
      >
        <i className="fa-solid fa-angle-up group-hover:animate-bounce text-background text-xl"></i>
      </button>
    </main>
  );
}

export default Home;
