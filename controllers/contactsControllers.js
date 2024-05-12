import { Contact } from "../models/contact.js";
import { HttpError } from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  try {
    const { _id: owner } = req.user;

    const results = await contactsService.listContacts({ owner });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getOneContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findById(id);

    if (!result) {
      return res.status(404).json({ message: HttpError(404).message });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { _id: owner } = req.user;
    const result = await Contact.findOneAndDelete(id, owner);
    if (!result) {
      res.status(404).json({ message: HttpError(404).message });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createContact = async (req, res) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: HttpError(404).message });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStatusContact = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: HttpError(404).message });
    }
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
