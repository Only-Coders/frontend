import axios from "@/plugins/axios";
import { User } from "@/models/user";

export async function getSuggestedContacts(size: number): Promise<User[]> {
  const response = await axios.get(`/api/suggested-users`, { params: { size } });
  return response.data;
}
