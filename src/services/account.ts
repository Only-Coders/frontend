import axios from "@/plugins/axios";

export async function eliminateAccount(): Promise<{ eliminationDate: string }> {
  const response = await axios.put(`/api/users/elimination`);
  return response.data;
}

export async function cancelAccountElimination(): Promise<void> {
  await axios.delete(`/api/users/elimination`);
}
