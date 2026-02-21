import path from "path";
import Contact from "../db/models/Contacts.js";

const contactsPath = path.resolve("db", "contacts.json");

async function listContacts() {
  return await Contact.findAll();
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  return await Contact.findByPk(contactId);
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  return await Contact.create(name, email, phone);
}

async function updateContact(contactId, contactData) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  await contact.update(contactData);
  return contact;
}

async function updateStatusContact(contactId, body) {
  const contact = await Contact.findByPk(contactId);

  if (!contact) return null;

  await contact.update(contactData);
  return contact;
}
export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact
};
