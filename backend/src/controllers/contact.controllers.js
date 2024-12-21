import { Contact } from "../models/contact.models.js";

const contactForm = async (req, res) => {
  try {
    const response = req.body;
    await Contact.create(response);
    return res
      .status(200)
      .send({ success: true, message: "Message sent sucessfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "message not delivered" });
  }
};

const getContact = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(400).send({ message: "internal server error" });
  }
};

const getContactById = async (req, res) => {
  try {
    const contactId = req.params.id;
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).send({ message: "Contact not found" });
    }

    res.status(200).send(contact);
  } catch (error) {
    res.status(500).send("internal server error");
  }
};

const updateContact = async (req, res) => {
  try {
    const { isFeatured } = req.body;
    console.log(isFeatured);

    const existingContact = await Contact.findById(req.params.id);
    if (!existingContact) {
      return res
        .status(404)
        .send({ success: false, message: "Contact not found" });
    }

    existingContact.isFeatured = isFeatured;

    const updatedContact = await existingContact.save();

    res.status(200).send({
      success: true,
      message: "Contact updated successfully",
      updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res
      .status(500)
      .send({ success: false, message: "Problem updating the contact" });
  }
};

const deleteContact = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).send({
      success: true,
      message: "contact deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

export {
  contactForm,
  getContact,
  getContactById,
  updateContact,
  deleteContact,
};
