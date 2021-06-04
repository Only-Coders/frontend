import axios from "@/plugins/axios";
import { Pagination } from "@/models/Pagination/pagination";
import { User } from "@/models/user";

export async function postFollow(canonicalName: string): Promise<void> {
  await axios.post(`/api/users/following/${canonicalName}`);
}

export async function deleteFollow(canonicalName: string): Promise<void> {
  await axios.delete(`/api/users/following/${canonicalName}`);
}

export async function getFollows(
  page: number,
  size: number,
  orderBy: string,
  partialName?: string,
  countryName?: string,
  skillName?: string
): Promise<Pagination<User>> {
  const response = await axios.get(`/api/users/follows`, {
    params: { page, size, orderBy, partialName, countryName, skillName }
  });
  return response.data;
}
