// feedbackUtils.js
import axios from "axios";

const API = "/api/v1/contact";

export const useUserFeedbacks = (auth) => {
  const getUserFeedbacks = async () => {
    try {
      const res = await axios.get(API);
      const contacts = await res.data;
      const userFeedbacks = contacts.filter(
        (contact) => contact.name === auth?.user?.name
      );
      return userFeedbacks;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  return { getUserFeedbacks };
};
