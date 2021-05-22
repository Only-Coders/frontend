import axios from "@/plugins/axios";

export async function post_follow(canonicalName: string): Promise<void> {
  await axios.post(`/api/users/following/${canonicalName}`);
}

export async function delete_follow(canonicalName: string): Promise<void> {
  await axios.delete(`/api/users/following/${canonicalName}`);
}
