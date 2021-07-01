import axios from "@/plugins/axios";
import { UsersQuantity } from "@/models/usersQuantity";
import { LanguageUse } from "@/models/languageUse";
import { PostsAndReactionsPerHour } from "@/models/postsAndReactionsPerHour";
import { PostsPerDay } from "@/models/postsPerDay";

export async function getUsersQuantity(): Promise<UsersQuantity> {
  const { data } = await axios.get<UsersQuantity>(`/api/data-reports/users-quantity`);
  return data;
}

export async function getLanguageUse(): Promise<LanguageUse[]> {
  const { data } = await axios.get<LanguageUse[]>(`/api/data-reports/language-use`);
  return data;
}

export async function getPostsAndReactionsPerHour(): Promise<PostsAndReactionsPerHour[]> {
  const { data } = await axios.get<PostsAndReactionsPerHour[]>(`/api/data-reports/posts-and-reactions-per-hour`);
  return data;
}

export async function getPostsPerDay(): Promise<PostsPerDay[]> {
  const { data } = await axios.get<PostsPerDay[]>(`/api/data-reports/posts-per-day`);
  return data;
}
