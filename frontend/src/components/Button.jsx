import Loading from "./Loading";

/* eslint-disable react/prop-types */
function Button({ children, onClick, disabled }) {
  return (
    <button
      className={`bg-primary w-full text-background font-semibold py-3 px-5 text-md  transition delay-50 hover:bg-primaryShadow hover:ease-in-out md:w-auto flex gap-3 justify-center items-center `}
      onClick={onClick}
    >
      {disabled ? <Loading /> : null}
      {children}
    </button>
  );
}

export default Button;
