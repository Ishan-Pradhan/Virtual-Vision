/* eslint-disable  */
import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer from "../reducer/contactReducer";
import { useAuthContext } from "./authcontext";

const ContactContext = createContext();

const API = "/api/v1/contact";

const ContactProvider = ({ children }) => {
  const [auth] = useAuthContext();

  const initialState = {
    contacts: [],
    featuredContacts: [],
    singleContact: {},
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const getContacts = async (url) => {
    try {
      const res = await axios.get(url);

      const contacts = await res.data;

      dispatch({ type: "CONTACTS", payload: contacts });
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleContact = async (url) => {
    try {
      const token = auth.token;
      const res = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      const singleContact = await res.data;
      dispatch({ type: "SET_SINGLE_CONTACT", payload: singleContact });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContacts(API);
  }, []);

  return (
    <ContactContext.Provider value={{ ...state, getSingleContact }}>
      {children}
    </ContactContext.Provider>
  );
};

const useContactContext = () => {
  return useContext(ContactContext);
};

export { ContactProvider, ContactContext, useContactContext };
