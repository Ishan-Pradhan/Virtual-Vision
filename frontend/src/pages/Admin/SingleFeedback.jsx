import { useEffect, useState } from "react";
import { useContactContext } from "../../context/contactcontext";
import { useParams } from "react-router-dom";
import AdminMenu from "../../components/AdminPage/AdminMenu";

import axios from "axios";
import { toast } from "react-toastify";

function SingleFeedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  const API = "http://localhost:8000/api/v1/contact";
  const { getSingleContact, singleContact } = useContactContext();
  const { id } = useParams();
  useEffect(() => {
    getSingleContact(`${API}/${id}`);
  }, []);

  useEffect(() => {
    if (singleContact) {
      setName(singleContact.name);
      setEmail(singleContact.email);
      setMessage(singleContact.message);
      setIsFeatured(singleContact.isFeatured);
    }
  }, [singleContact]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = { isFeatured };
      const response = await axios.put(`/api/v1/contact/${id}`, data);

      if (response.data.success) {
        toast.success("Feedback updated sucessfully");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error("error haha");
      console.log(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      let answer = window.prompt(
        "Are you sure you want to delete this contact?"
      );
      if (!answer) return;
      await axios.delete(`/api/v1/contact/${id}`);
      toast.success("feedback deleted successfully");
      return;
    } catch (error) {
      console.log(error);
      toast.error("error deleting");
    }
  };
  return (
    <>
      <section className="container  flex justify-start items-start gap-10 ">
        <AdminMenu />
        <div className="my-10 flex flex-col w-full justify-center items-center">
          <h2 className="text-2xl uppercase font-head font-bold mb-1 text-center">
            Manage Feedback
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
                className="border-2  px-2"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                id="email"
                type="text"
                value={email}
                className="border-2  px-2"
                disabled
              />
            </div>
            <div className="flex flex-col gap-2 mb-2">
              <label htmlFor="message" className="font-semibold">
                Message
              </label>
              <textarea
                id="message"
                type="text"
                rows="6"
                value={message}
                className="border-2  px-2"
                disabled
              ></textarea>
            </div>
            <label htmlFor="featured">Set as Featured</label>
            <div className="flex flex-col gap-2 mb-2">
              <select
                name=""
                className="bg-background border-2 px-2"
                id="featured"
                value={isFeatured}
                onChange={(e) => setIsFeatured(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <button
                  className="bg-red-300 group text-red-700 font-semibold py-2 px-6 text-md  transition-all duration-300 ease-in hover:bg-red-600 hover:text-background hover:ease-in-out md:w-auto flex gap-3 items-center"
                  onClick={handleDelete}
                >
                  Delete
                  <i className="fa-solid fa-trash text-red-700 transition group:duration-300 ease-in group-hover:text-background"></i>
                </button>
              </div>
              <div>
                <button
                  className="bg-secondary text-background font-semibold py-2 px-3 text-md   transition duration-300 ease-in hover:bg-secondaryTint hover:text-text hover:ease-in-out md:w-auto flex gap-3 items-center"
                  onClick={handleSubmit}
                >
                  Update Feedback
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default SingleFeedback;
