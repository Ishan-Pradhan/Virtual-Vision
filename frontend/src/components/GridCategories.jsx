import { Link } from "react-router-dom";
/* eslint-disable react/prop-types */
function GridCategories({ images, title, scrollToTop }) {
  return (
    <div className="relative flex justify-center items-center h-full object-cover ">
      <Link
        to="/WomenProduct"
        className=" flex h-full w-full flex-col justify-center items-center group "
        onClick={scrollToTop}
      >
        <img
          src={`${images}`}
          alt=""
          className="relative h-full w-full brightness-50 transition duration-1000 group-hover:scale-125 group-hover:ease-in-out rounded-3xl object-cover object-center overflow-hidden"
          loading="lazy"
        />
        <div className="absolute flex flex-col text-center">
          <span className="text-4xl font-bold uppercase text-background">
            {title}
          </span>
          <span className="text-background">View all</span>
        </div>
      </Link>
    </div>
  );
}

export default GridCategories;
