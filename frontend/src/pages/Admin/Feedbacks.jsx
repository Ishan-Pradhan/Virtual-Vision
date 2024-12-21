import { NavLink } from "react-router-dom";
import AdminMenu from "../../components/AdminPage/AdminMenu";
import { useContactContext } from "../../context/contactcontext";
import { useState } from "react";

function Feedbacks() {
  const { contacts } = useContactContext();
  const [search, setSearch] = useState("");

  // Filtered feedbacks based on search term
  const filteredFeedback = contacts.filter((contact) =>
    contact.email.includes(search)
  );

  return (
    <>
      <section className="  flex justify-start items-start gap-10 mb-10">
        <AdminMenu />
        <div className="mt-10 container mx-auto">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Feedbacks
          </h2>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search by email..."
            className="px-2 border"
          />
          <div className="grid grid-cols-5 border-b-2 border-text  py-5 mt-10 gap-10 font-semibold">
            <span>Name</span>
            <span>Email</span>
            <span className="col-span-2">Message</span>
            <span>More Info</span>
          </div>
          <div>
            {filteredFeedback.length === 0 && search !== "" ? (
              <div className="text-center py-3">No feedbacks found.</div>
            ) : (
              filteredFeedback.map((contact) => (
                <div
                  className="grid grid-cols-5 my-6  py-5 gap-10 border-b"
                  key={contact._id}
                >
                  <div>{contact.name}</div>
                  <div className="break-words">{contact.email}</div>
                  <div className="col-span-2">{contact.message}</div>
                  <NavLink to={`/dashboard/admin/feedbacks/${contact._id}`}>
                    <button className="font-bold text-secondary hover:underline">
                      Update
                    </button>
                  </NavLink>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Feedbacks;
