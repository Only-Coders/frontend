import axios from "@/plugins/axios";
import { Profile } from "@/models/profile";
import { UserPagination } from "@/models/Pagination/userPagination";

export async function get(canonicalName: string): Promise<Profile> {
  const response = await axios.get(`/api/users/${canonicalName}`);
  return response.data;
}

export async function getUser(partialName: string, page?: number, size?: number): Promise<UserPagination> {
  const response = await axios.get(`/api/users`, { params: { partialName, page, size } });
  return response.data;
}
