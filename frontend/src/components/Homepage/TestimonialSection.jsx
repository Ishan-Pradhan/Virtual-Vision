import { useContactContext } from "../../context/contactcontext";
import Testimonial from "../Testimonial";

function TestimonialSection() {
  const { featuredContacts } = useContactContext();
  if (featuredContacts.length === 0) {
    return;
  }
  return (
    <section
      className="my-20 flex items-center justify-center"
      data-aos="fade-down"
    >
      <div className="container mx-auto md:px-16 flex flex-col items-center md:items-start">
        <h3 className="font-semibold font-head text-2xl md:text-4xl text-start">
          Testimonials
        </h3>
        {/* <div className="flex justify-center gap-14  md:gap-4 my-10 flex-wrap md:justify-between items-center"> */}
        <div className="grid grid-cols-1 justify-center items-center gap-10 md:grid-cols-3  md:gap-10 my-10  ">
          {featuredContacts.map((message) => {
            return <Testimonial key={message._id} message={message} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default TestimonialSection;
