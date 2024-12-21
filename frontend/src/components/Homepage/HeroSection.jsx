import { useReducer } from "react";
import Button from "../Button";
import { Link } from "react-router-dom";

const images = ["images/hero1.jpg"];

function HeroSection() {
  return (
    <section id="hero" className="relative w-full">
      <div
        className={`h-[85vh] p-10 md:h-[86vh] bg-cover bg-right-top  md:bg-top  flex flex-col justify-center items-start md:p-20 gap-5 mx-auto `}
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.35) 50%, rgba(0, 0, 0, 0.0)), url("images/hero1.jpg")`,
        }}
      >
        <div
          className={`container px-5 relative flex flex-col justify-between items-start gap-6 mx-auto  `}
        >
          <div
            className={`flex flex-col justify-start items-start md:items-start gap-4 w-full`}
          >
            <div className="md:w-1/2" data-aos="fade-up">
              <h1
                className="font-head text-4xl md:text-7xl font-semibold text-background my-5 "
                data-aos="fade-up"
                data-aos-once="true"
              >
                Clear Vision, Endless Possibilities.
              </h1>
              <Link to="/MenProduct" className="flex">
                <Button>SHOP NOW</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
