import { NavLink } from "react-router-dom";

function NotFound() {
  return (
    <main className="grid h-lvh place-items-center bg-white px-6 py-14 sm:py-32 lg:px-8">
      <div className="text-center flex flex-col justify-center items-center gap-2">
        <p className="text-base font-semibold text-secondary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <img src="/images/404-error.png" alt="" className="w-44 h-44" />
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <NavLink
            to="/"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primaryTint "
          >
            Go back home
          </NavLink>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
