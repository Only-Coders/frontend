import axios from "@/plugins/axios";
import { TagPagination } from "@/models/Pagination/tagPagination";

export async function get(tagName: string): Promise<TagPagination> {
  const response = await axios.get(`/api/tags`, { params: { tagName } });
  return response.data;
}

export async function post(canonicalName: string): Promise<{ canonicalName: string }> {
  const response = await axios.post(`/api/tags`, { canonicalName });
  return response.data;
}
