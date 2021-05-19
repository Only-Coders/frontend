import axios from "@/plugins/axios";

export async function post_follow(canonicalName: string): Promise<void> {
  const response = await axios.post(`/api/users/following/${canonicalName}`);
  return response.data;
}
