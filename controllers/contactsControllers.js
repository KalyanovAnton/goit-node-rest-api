import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  try {
    const result = await contactsService.listContacts();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const result = await contactsService.getContactById(req.params.id);

    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const result = await contactsService.removeContact(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createContact = async (req, res) => {
  const { error } = createContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }
  try {
    const { name, email, phone } = req.body;
    const result = await contactsService.addContact(name, email, phone);

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateContact = async (req, res) => {
  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const { id } = req.params;
    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }
    
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
