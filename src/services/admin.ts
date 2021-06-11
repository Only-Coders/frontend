import axios from "@/plugins/axios";
import { Admin } from "@/models/admin";

export async function addAdmin(admin: Admin): Promise<void> {
  await axios.post(`/api/admins`, admin);
}
