import axios from "@/plugins/axios";
import { RecentSearch } from "@/models/recentSearch";

export async function getRecentSearches(): Promise<RecentSearch[]> {
  const response = await axios.get(`/api/recent-searches`);
  return response.data;
}

export async function addRecentSearch(recentSearch: RecentSearch): Promise<void> {
  await axios.post<{ token: string }>(`/api/recent-searches`, recentSearch);
}

export async function clearRecentSearches(): Promise<void> {
  await axios.delete(`/api/recent-searches`);
}
