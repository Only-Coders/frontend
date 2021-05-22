import axios from "@/plugins/axios";
import { TagPagination } from "@/models/Pagination/tagPagination";

export async function get(tagName: string, size: number): Promise<TagPagination> {
  const response = await axios.get(`/api/tags`, { params: { tagName, size } });
  return response.data;
}

export async function post(canonicalName: string): Promise<void> {
  await axios.post(`/api/users/tags/${canonicalName}`);
}
