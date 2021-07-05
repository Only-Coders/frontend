import { Language } from "@/models/language";
import axios from "@/plugins/axios";

export async function setLanguage(language: Language): Promise<void> {
  await axios.put(`/api/users/language`, language);
}
