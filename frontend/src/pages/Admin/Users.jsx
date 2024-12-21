import { useEffect, useState } from "react";
import AdminMenu from "../../components/AdminPage/AdminMenu";
import axios from "axios";
import { NavLink } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const filteredUsers = users.filter((user) => user.email.includes(search));

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("/api/v1/auth/users");
        const data = res.data;
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <section className="container flex justify-start items-start gap-10">
        <AdminMenu />
        <div className="mt-10 w-full">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Users
          </h2>
          <input
            type="text"
            placeholder="Search by user email..."
            className="border border-gray-300 px-2 rounded mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="grid grid-cols-9 border-b-2  px-10 py-5 gap-10 border-text ">
            <span className="font-bold font-head col-span-3">Name</span>
            <span className="font-bold font-head col-span-3">Email</span>
            <span className="font-bold font-head col-span-2">Roles</span>
          </div>
          <div>
            {filteredUsers.length === 0 && search !== "" ? (
              <div className="text-center py-3">No users found.</div>
            ) : (
              filteredUsers.map((user) => (
                <div
                  key={user._id}
                  className="grid grid-cols-9 px-10 py-5 border-b-2  gap-10"
                >
                  <div className="col-span-3">{user.name}</div>
                  <div className="col-span-3">{user.email}</div>
                  <div
                    className={
                      user.role === 1
                        ? "text-secondary font-bold col-span-2"
                        : "text-text col-span-2"
                    }
                  >
                    {user.role === 0 ? "User" : "Admin"}
                  </div>
                  <NavLink
                    to={`/dashboard/admin/users/${user._id}`}
                    className="text-secondary hover:text-secondaryTint font-bold hover:underline"
                  >
                    Edit
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

export default Users;
