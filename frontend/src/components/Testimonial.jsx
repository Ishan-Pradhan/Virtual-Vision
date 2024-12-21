/* eslint-disable react/prop-types */
function Testimonial({ message }) {
  return (
    <div className="h-50 border-4 border-text  p-5 relative w-[350px]">
      <i className="fa-solid fa-quote-right absolute text-secondary -top-6 right-0 text-5xl"></i>
      <p className="font-normal text-sm">&quot;{message.message}&quot;</p>
      <div className="flex items-center gap-5 mt-4">
        <div className="flex flex-col">
          <span className="text-sm font-bold">{message.name}</span>
          <span className="text-sm">{message.email}</span>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
