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
