import axios from "@/plugins/axios";
import { SuggestedContact } from "@/models/suggestedContact";

export async function get(size: number): Promise<SuggestedContact[]> {
  const response = await axios.get(`/api/suggested-users`, { params: { size } });
  return response.data;
}
