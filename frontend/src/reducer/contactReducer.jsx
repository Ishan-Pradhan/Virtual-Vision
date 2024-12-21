/* eslint-disable */
const ContactReducer = (state, action) => {
  switch (action.type) {
    case "CONTACTS":
      const featureData = action.payload
        ? action.payload.filter((curEl) => curEl.isFeatured === true)
        : [];

      return {
        ...state,
        isLoading: false,
        contacts: action.payload,
        featuredContacts: featureData,
      };

    case "SET_SINGLE_CONTACT":
      return {
        ...state,
        singleContact: action.payload,
      };

    default:
      return state;
  }
};

export default ContactReducer;
