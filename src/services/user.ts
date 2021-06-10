import axios from "@/plugins/axios";
import { Profile } from "@/models/profile";
import { Pagination } from "@/models/Pagination/pagination";
import { User } from "@/models/user";
import { GetPost } from "@/models/post";
import { UsersOptionsOrderBy } from "@/models/Enums/usersOptionsOrderBy";

export async function getUserByCanonicalName(canonicalName: string): Promise<Profile> {
  const response = await axios.get(`/api/users/${canonicalName}`);
  return response.data;
}

export async function getUser(parameters: {
  partialName: string;
  orderBy?: UsersOptionsOrderBy;
  page?: number;
  size?: number;
  countryName?: string;
  skillName?: string;
}): Promise<Pagination<User>> {
  const response = await axios.get(`/api/users`, {
    params: {
      partialName: parameters.partialName,
      page: parameters.page,
      size: parameters.size,
      orderBy: parameters.orderBy,
      countryName: parameters.countryName,
      skillName: parameters.skillName
    }
  });
  return response.data;
}

export async function postSavePostAsFavorite(postId: string): Promise<void> {
  await axios.post(`/api/users/favorite-posts/${postId}`);
}

export async function deletePostFromFavorite(postId: string): Promise<void> {
  await axios.delete(`/api/users/favorite-posts/${postId}`);
}

export async function getFavoritePosts(page: number, size: number): Promise<Pagination<GetPost>> {
  const response = await axios.get(`/api/users/favorite-posts`, { params: { page, size } });
  return response.data;
}
