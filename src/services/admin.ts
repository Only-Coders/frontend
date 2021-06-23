import axios from "@/plugins/axios";
import { Admin } from "@/models/admin";
import { Role } from "@/models/Enums/role";
import { Pagination } from "@/models/Pagination/pagination";
import { AdminsOptionsOrderBy } from "@/models/Enums/adminOptionsOrderBy";
import { AdminsOptionsSortBy } from "@/models/Enums/adminsOptionsSortBy";

export async function addAdmin(admin: Admin): Promise<void> {
  await axios.post(`/api/admins`, admin);
}

export async function getAdminUsers(
  partialName: string,
  role: Role,
  sortBy?: AdminsOptionsSortBy,
  orderBy?: AdminsOptionsOrderBy,
  page?: number,
  size?: number
): Promise<Pagination<Admin[]>> {
  const response = await axios.get("/api/admins", {
    params: { partialName, role, sortBy, orderBy, page, size }
  });
  return response.data;
}
