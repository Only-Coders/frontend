import axios from "@/plugins/axios";
import { Contact } from "@/models/contact";

export async function post(contact: Contact): Promise<void> {
  const response = await axios.post(`/api/users/contact-request`, contact);
  return response.data;
}
