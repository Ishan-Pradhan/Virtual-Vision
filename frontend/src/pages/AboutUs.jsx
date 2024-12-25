import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Features from "../components/Homepage/Features";
import PageNavigation from "../components/PageNavigation";
import TestimonialSection from "../components/Homepage/testimonialSection";

function AboutUs() {
  return (
    <>
      <Header />
      <PageNavigation title={"About us"} />
      <section className="container px-8 md:px-16 mx-auto">
        <h2
          className="text-2xl md:text-4xl font-bold text-center mb-8"
          data-aos="fade-down"
        >
          Welcome to Virtual Vision
        </h2>
        {/* Hero Section */}
        <div className="flex flex-col gap-10 md:flex-row items-center">
          <div className="md:w-1/2">
            <img
              src="images/group.jpg"
              alt="glass co"
              className="w-full object-cover h-[200px] md:h-[400px]"
              data-aos="fade-right"
              loading="lazy"
            />
          </div>
          <div className="md:w-1/2" data-aos="fade-left">
            <p className="leading-6 mb-4">
              Virtual Vision is a family-owned business committed to delivering
              high-quality, stylish eyewear while fostering innovation in the
              industry. Established in 1959, our mission is to enhance vision
              and confidence with every pair of glasses.
            </p>
            <p className="leading-6 mb-4">
              Virtual Vision was founded in Kathmandu, Nepal, by{" "}
              <span className="font-semibold">Peter Griffin</span>, the late
              father of our current CEO{" "}
              <span className="font-semibold">Sarah Thompson</span>. Since its
              inception in 1959, the company has been dedicated to crafting
              eyewear that blends functionality with timeless design. Sarah
              inherited her father’s passion for innovation and business acumen,
              shaping Virtual Vision into a global brand.
            </p>
            <p className="leading-6">
              In the 1940s, Peter Griffin was a pioneer in his community,
              recognized as a trailblazer in social entrepreneurship. He laid
              the foundation for Nepal’s earliest social service initiatives,
              including the Paropakar Organisation. Inspired by his vision,
              Virtual Vision combines a legacy of craftsmanship with a modern
              approach to eyewear, empowering individuals worldwide to see and
              be seen.
            </p>
          </div>
        </div>

        <h3 className="font-semibold font-head text-2xl md:text-4xl mb-4 mt-16">
          Our Management
        </h3>
        {/* <section className="container flex flex-wrap justify-center md:justify-center gap-5 md:gap-10 mt-10 mb-20"> */}
        <section className="md:container grid grid-cols-1 md:grid-cols-3 justify-center items-center md:justify-center gap-5 md:gap-10 mt-10 mb-20">
          {/* Management Team Members */}
          <div
            className="group relative w-full md:w-72 overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            <img
              src="images/fakeowner.jpg"
              alt="Sarah Thompson"
              className="w-full h-full object-cover"
            />
            <div className="overlay opacity-0 translate-y-16 group-hover:opacity-100 transition duration-500 absolute group-hover:-translate-y-0 top-0 left-0 w-full h-full p-4 flex flex-col justify-center items-start bg-secondary">
              <h2 className="management-name-inner font-head text-secondaryTint text-lg md:text-3xl font-semibold overflow-hidden">
                Sarah Thompson
              </h2>
              <h4 className="management-title-inner text-gray-400 text-sm md:text-md font-semibold mb-4">
                Founder & CEO
              </h4>
              <p className="management-info text-background text-sm">
                Sarah Thompson, the visionary behind Virtual Vision, combines
                her passion for eyewear with a drive to revolutionize the
                industry. With a background in design and entrepreneurship,
                Sarah ensures every pair of glasses embodies both style and
                comfort, catering to diverse customer needs.
              </p>
              <div className="flex gap-4 justify-center items-center mt-4 w-full">
                <a href="#" className="text-white">
                  <i className="fab fa-instagram text-background text-2xl"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-facebook-square text-background text-2xl"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-twitter-square text-background text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div
            className="group relative w-full md:w-72 overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <img
              src="images/fakedesigner.jpg"
              alt="Michael Reynolds"
              className="people-image w-full h-full object-cover"
            />
            <div className="overlay opacity-0 translate-y-16 group-hover:opacity-100 transition duration-500 absolute group-hover:-translate-y-0 top-0 left-0 w-full h-full p-4 flex flex-col justify-center items-start bg-secondary">
              <h2 className="management-name-inner font-head text-secondaryTint text-lg md:text-3xl font-semibold overflow-hidden">
                Michael Reynolds
              </h2>
              <h4 className="management-title-inner text-gray-400 text-sm md:text-md font-semibold mb-4">
                Head Designer
              </h4>
              <p className="management-info text-background text-sm">
                Michael Reynolds brings a wealth of creativity to Virtual Vision
                as the Head Designer. Drawing inspiration from global trends,
                Michael crafts innovative eyewear that seamlessly blends fashion
                and functionality, appealing to modern lifestyles.
              </p>
              <div className="flex gap-4 justify-center items-center mt-4 w-full">
                <a href="#" className="text-white">
                  <i className="fab fa-instagram text-background text-2xl"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-facebook-square text-background text-2xl"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-twitter-square text-background text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
          <div
            className="group relative w-full md:w-72 overflow-hidden"
            data-aos="fade-right"
            data-aos-delay="500"
          >
            <img
              src="images/fakemanager.jpg"
              alt="Emily Carter"
              className="people-image w-full h-full object-cover"
            />
            <div className="overlay opacity-0 translate-y-16 group-hover:opacity-100 transition duration-500 absolute group-hover:-translate-y-0 top-0 left-0 w-full h-full p-4 flex flex-col justify-center items-start bg-secondary">
              <h2 className="management-name-inner font-head text-secondaryTint text-lg md:text-3xl font-semibold overflow-hidden">
                Emily Carter
              </h2>
              <h4 className="management-title-inner text-gray-400 text-sm md:text-md font-semibold mb-4">
                Operations Manager
              </h4>
              <p className="management-info text-background text-sm">
                Emily Carter ensures the smooth operation of Virtual Vision's
                supply chain and customer service. With years of experience in
                logistics and a focus on excellence, Emily guarantees timely
                delivery and exceptional quality in every product.
              </p>
              <div className="flex gap-4 justify-center items-center mt-4 w-full">
                <a href="#" className="text-white">
                  <i className="fab fa-instagram text-background text-2xl"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-facebook-square text-background text-2xl"></i>
                </a>
                <a href="#" className="text-white">
                  <i className="fab fa-twitter-square text-background text-2xl"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Our Features */}
        {/* <div className="flex flex-col gap-1 md:gap-10">
          <h3 className="font-semibold font-head text-2xl md:text-4xl">
            Our Features
          </h3>
          <Features />
        </div> */}
      </section>
      <TestimonialSection />
      <Footer />
    </>
  );
}

export default AboutUs;
