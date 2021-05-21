import axios from "@/plugins/axios";
import { Contact } from "@/models/contact";

export async function post_contact_request(contact: Contact): Promise<void> {
  const response = await axios.post(`/api/users/contact-request`, contact);
  return response.data;
}

export async function delete_contact_request(canonicalName: string): Promise<void> {
  const response = await axios.delete(`/api/users/contact-request/${canonicalName}`);
  return response.data;
}
