import axios from "@/plugins/axios";
import { UsersQuantity } from "@/models/usersQuantity";

export async function getUsersQuantity(): Promise<UsersQuantity> {
  const { data } = await axios.get<UsersQuantity>(`/api/data-reports/users-quantity`);
  return data;
}
