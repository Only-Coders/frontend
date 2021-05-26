import axios from "@/plugins/axios";
import { Profile } from "@/models/profile";

export async function get(canonicalName: string): Promise<Profile> {
  const response = await axios.get(`/api/users/${canonicalName}`);
  return response.data;
}
