import axios from "@/plugins/axios";
import { Admin } from "@/models/admin";
import { Role } from "@/models/Enums/role";
import { Pagination } from "@/models/Pagination/pagination";

export async function addAdmin(admin: Admin): Promise<void> {
  await axios.post(`/api/admins`, admin);
}

export async function getAdmin(
  partialName: string,
  role: Role,
  page?: number,
  size?: number
): Promise<Pagination<Admin[]>> {
  const response = await axios.get("/api/admins", {
    params: { page, size, partialName, role }
  });
  return response.data;
}
