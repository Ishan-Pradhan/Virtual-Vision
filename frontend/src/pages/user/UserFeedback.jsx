// UserFeedback.js
import React, { useEffect } from "react";
import Header from "../../components/Header";
import UserMenu from "../../components/User/UserMenu";
import { useAuthContext } from "../../context/authcontext";
import { useUserFeedbacks } from "../../utils/feedbackUtils";
import Footer from "../../components/Footer";

function UserFeedback() {
  const [auth] = useAuthContext();
  const { getUserFeedbacks } = useUserFeedbacks(auth);

  // Assuming you have a state to store user feedbacks
  const [userFeedbacks, setUserFeedbacks] = React.useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const feedbacks = await getUserFeedbacks();
      setUserFeedbacks(feedbacks);
    };

    fetchData();
  }, [getUserFeedbacks]);

  return (
    <>
      <Header />

      <section className="flex flex-col container mx-auto md:flex-row justify-start items-start gap-10 px-5 md:px-0">
        <UserMenu />
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-semibold mb-4">My Feedback</h2>
          <div className="grid grid-cols-4 my-3 border-b-2 py-4 border-text w-full">
            <span className="font-bold">Name</span>
            <span className="hidden font-bold md:flex">Email</span>
            <span className="col-span-3 md:col-span-2 font-bold"> Message</span>
          </div>
          {userFeedbacks.length > 0 ? (
            userFeedbacks.map((feedback) => (
              <div key={feedback._id} className="grid grid-cols-4 my-2 gap-6">
                <p>{feedback.name}</p>
                <p className="hidden md:flex">{feedback.email}</p>
                <p className="col-span-3 md:col-span-2">{feedback.message}</p>
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center mt-10">
              <p>No feedback provided yet.</p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default UserFeedback;
