import { NavLink } from "react-router-dom";

function Logo() {
  return (
    <NavLink to="/">
      <img src="/images/logo/logo.png" className="h-20 " alt="" />
    </NavLink>
  );
}

export default Logo;
