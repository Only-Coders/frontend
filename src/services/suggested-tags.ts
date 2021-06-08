import axios from "@/plugins/axios";
import { Tag } from "@/models/tag";

export async function getTags(size: number): Promise<Tag[]> {
  const response = await axios.get(`/api/suggested-tags`, { params: { size } });
  return response.data;
}
