import axios from "@/plugins/axios";
import { Pagination } from "@/models/Pagination/pagination";
import { ContactRequester } from "@/models/contactRequester";
import { ContactRequestResponse } from "@/models/contactRequestResponse";

export async function getContactRequests(page: number, size: number): Promise<Pagination<ContactRequester>> {
  const response = await axios.get(`/api/users/received-contact-requests`, { params: { page, size } });
  return response.data;
}

export async function postContactRequestResponse(contactRequestResponse: ContactRequestResponse): Promise<void> {
  await axios.put(`/api/users/received-contact-requests`, contactRequestResponse);
}
