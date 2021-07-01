import axios from "@/plugins/axios";
import { UsersQuantity } from "@/models/usersQuantity";
import { LanguageUse } from "@/models/languageUse";

export async function getUsersQuantity(): Promise<UsersQuantity> {
  const { data } = await axios.get<UsersQuantity>(`/api/data-reports/users-quantity`);
  return data;
}

export async function getLanguageUse(): Promise<LanguageUse[]> {
  const { data } = await axios.get<LanguageUse[]>(`/api/data-reports/language-use`);
  return data;
}
