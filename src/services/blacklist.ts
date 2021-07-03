import axios from "@/plugins/axios";
import { BlacklistUser } from "@/models/blacklistUser";
import { Pagination } from "@/models/Pagination/pagination";

export async function getBlacklistUsers(
  partialEmail: string,
  page?: number,
  size?: number
): Promise<Pagination<BlacklistUser>> {
  const response = await axios.get(`/api/blacklist`, {
    params: { partialEmail, page, size }
  });
  return response.data;
}

export async function deleteBlacklistUser(email: string): Promise<Pagination<BlacklistUser>> {
  const response = await axios.delete(`/api/blacklist/${email}`);
  return response.data;
}

export async function postUserToBlacklist(email: string): Promise<BlacklistUser> {
  const { data } = await axios.post(`/api/blacklist`, { email });
  return data;
}
