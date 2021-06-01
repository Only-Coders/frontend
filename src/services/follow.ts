import axios from "@/plugins/axios";

export async function postFollow(canonicalName: string): Promise<void> {
  await axios.post(`/api/users/following/${canonicalName}`);
}

export async function deleteFollow(canonicalName: string): Promise<void> {
  await axios.delete(`/api/users/following/${canonicalName}`);
}
