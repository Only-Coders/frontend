import axios from "@/plugins/axios";
import { Profile } from "@/models/profile";
import { Pagination } from "@/models/Pagination/pagination";
import { User } from "@/models/user";
import { GetPost } from "@/models/post";

export async function get(canonicalName: string): Promise<Profile> {
  const response = await axios.get(`/api/users/${canonicalName}`);
  return response.data;
}

export async function getUser(partialName: string, page?: number, size?: number): Promise<Pagination<User>> {
  const response = await axios.get(`/api/users`, { params: { partialName, page, size } });
  return response.data;
}

export async function postSavePostAsFavorite(postId: string): Promise<void> {
  await axios.post(`/api/users/favorite-posts/${postId}`);
}

export async function deletePostFromFavorite(postId: string): Promise<void> {
  await axios.delete(`/api/users/favorite-posts/${postId}`);
}

export async function getUserFavoritePosts(): Promise<Pagination<GetPost>> {
  const response = await axios.get(`/api/users/favorite-posts`);
  return response.data;
}
