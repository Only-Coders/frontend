import axios from "@/plugins/axios";
import { ContactRequest } from "@/models/contactRequest";
import { Pagination } from "@/models/Pagination/pagination";
import { User } from "@/models/user";

export async function postContactRequest(contact: ContactRequest): Promise<void> {
  await axios.post(`/api/users/contact-request`, contact);
}

export async function deleteContactRequest(canonicalName: string): Promise<void> {
  await axios.delete(`/api/users/contact-request/${canonicalName}`);
}

export async function getContacts(
  page: number,
  size: number,
  orderBy: string,
  partialName?: string,
  countryName?: string,
  skillName?: string
): Promise<Pagination<User>> {
  const response = await axios.get(`/api/users/contacts`, {
    params: { page, size, orderBy, partialName, countryName, skillName }
  });
  return response.data;
}

export async function deleteContact(canonicalName: string): Promise<void> {
  await axios.delete(`/api/users/contacts/${canonicalName}`);
}
