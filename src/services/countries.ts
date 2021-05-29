import axios from "@/plugins/axios";
import { Country } from "@/models/country";

export async function getCountries(): Promise<Country[]> {
  const { data } = await axios.get<Country[]>("/api/countries");
  return data;
}
