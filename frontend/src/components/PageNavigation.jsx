/* eslint-disable */
import { NavLink } from "react-router-dom";

function PageNavigation({ title }) {
  return (
    <div className="m-10 text-xl font-head">
      <NavLink to="/" className="font-bold text-secondary">
        Home
      </NavLink>
      /{title}
    </div>
  );
}

export default PageNavigation;
