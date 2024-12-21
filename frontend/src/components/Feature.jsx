/* eslint-disable react/prop-types */
function Feature({ images, title, featureContent, dataAos }) {
  return (
    <div
      className="flex flex-col justify-center items-center gap-3"
      data-aos={dataAos}
    >
      <img
        src={`${images}`}
        alt=""
        className="h-16 w-16 bg-primaryTint2 rounded-full p-2 shadow-xl"
      />
      <div className="text-center">
        <span className="text-xl font-bold font-head">{title}</span>
        <p className="text-md">{featureContent}</p>
      </div>
    </div>
  );
}

export default Feature;
