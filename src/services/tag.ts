import axios from "@/plugins/axios";
import { Pagination } from "@/models/Pagination/pagination";
import { Tag } from "@/models/tag";

export async function getTag(tagName: string, size: number): Promise<Pagination<Tag>> {
  const response = await axios.get(`/api/tags`, { params: { tagName, size } });
  return response.data;
}

export async function post(canonicalName: string): Promise<void> {
  await axios.post(`/api/users/tags/${canonicalName}`);
}

export async function getTagsOfUser(
  userCanonicalName: string,
  page: number,
  size: number,
  tagCanonicalName: string
): Promise<Pagination<Tag>> {
  const response = await axios.get(`/api/users/${userCanonicalName}/tags`, {
    params: { page, size, tagCanonicalName }
  });
  return response.data;
}

export async function unfollowTag(canonicalName: string): Promise<void> {
  await axios.delete(`/api/users/tags/${canonicalName}`);
}
