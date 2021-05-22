import axios from "@/plugins/axios";
import { Contact } from "@/models/contact";

export async function post_contact_request(contact: Contact): Promise<void> {
  await axios.post(`/api/users/contact-request`, contact);
}

export async function delete_contact_request(canonicalName: string): Promise<void> {
  await axios.delete(`/api/users/contact-request/${canonicalName}`);
}
