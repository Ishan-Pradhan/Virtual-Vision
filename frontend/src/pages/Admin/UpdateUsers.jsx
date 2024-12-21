import { useNavigate, useParams } from "react-router-dom";
import AdminMenu from "../../components/AdminPage/AdminMenu";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function UpdateUsers() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(0);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/auth/users/${id}`
        );

        if (response.data) {
          const userData = response.data;
          setName(userData.name);
          setEmail(userData.email);
          setRole(userData.role);
        } else {
          throw new Error(response.data.message);
        }
      } catch (error) {
        toast.error(error.message);
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { role };

      const response = await axios.put(
        `http://localhost:8000/api/v1/auth/users/${id}`,
        data
      );
      console.log(response.data);
      if (response.data) {
        toast.success("Users updated sucessfully");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt("Are you sure you want to delete this user?");
      if (!answer) return;

      const adminname = "admin";

      if (name === adminname) {
        toast.error("You can't delete this admin");
        return;
      }

      const { data } = await axios.delete(
        `http://localhost:8000/api/v1/auth/users/${id}`
      );
      if (data.success) {
        toast.success("User deleted successfully");
        console.log("Navigating");
        navigate("/dashboard/admin/users");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("Error Deleting the user");
    }
  };

  return (
    <>
      <section className="container flex justify-start items-start gap-10 mb-10">
        <AdminMenu />
        <div className="mt-10 flex flex-col w-full justify-center items-center">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Manage User
          </h2>
          <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="border-2 shadow-lg w-1/2 bg-white p-10 grid grid-cols-1 gap-4 relative mt-5 "
          >
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                type="text"
                value={name}
                className="border border-[#888] py-1 px-2"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="name" className="font-semibold">
                Email
              </label>
              <input
                type="text"
                value={email}
                className="border border-[#888] py-1 px-2"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="featured" className="font-semibold">
                Set as Admin
              </label>
              <select
                name=""
                className="border border-[#888] py-1 px-2"
                id="featured"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            <div className="flex justify-between">
              <button
                className="bg-red-300 group text-red-700 font-semibold py-2 px-6 text-md  transition-all duration-300 ease-in hover:bg-red-600 hover:text-background hover:ease-in-out md:w-auto flex gap-3 items-center"
                onClick={handleDelete}
              >
                Delete
                <i className="fa-solid fa-trash text-red-700 transition group:duration-300 ease-in group-hover:text-background"></i>
              </button>
              <button
                className="bg-secondary text-background font-semibold py-2 px-3 text-md   transition delay-50 ease-in hover:bg-secondaryTint hover:text-text hover:ease-in-out md:w-auto flex gap-3 items-center"
                onClick={handleSubmit}
              >
                Update User
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default UpdateUsers;
