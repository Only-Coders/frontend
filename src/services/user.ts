import axios from "@/plugins/axios";
import { Profile } from "@/models/profile";
import { Pagination } from "@/models/Pagination/pagination";
import { User } from "@/models/user";

export async function getUserByCanonicalName(canonicalName: string): Promise<Profile> {
  const response = await axios.get(`/api/users/${canonicalName}`);
  return response.data;
}

export async function getUser(partialName: string, page?: number, size?: number): Promise<Pagination<User>> {
  const response = await axios.get(`/api/users`, { params: { partialName, page, size } });
  return response.data;
}
