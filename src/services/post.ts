import axios from "@/plugins/axios";
import { Post } from "@/models/post";
import { Pagination } from "@/models/Pagination/pagination";
import { GetPost } from "@/models/post";
import { ReactionType } from "@/models/Enums/reaction";

export async function post(post: Post): Promise<GetPost> {
  const response = await axios.post(`/api/posts`, post);
  return response.data;
}

export async function getPost(page: number, size: number): Promise<Pagination<GetPost>> {
  const response = await axios.get(`/api/feed-posts`, { params: { page, size } });
  return response.data;
}

export async function getUserPost(canonicalName: string, page: number, size: number): Promise<Pagination<GetPost>> {
  const response = await axios.get(`/api/posts/user/${canonicalName}`, { params: { page, size } });
  return response.data;
}

export async function deletePost(postId: string): Promise<void> {
  await axios.delete(`/api/posts/${postId}`);
}

export async function addPostReaction(postId: string, reaction: ReactionType | null): Promise<void> {
  await axios.post(`/api/posts/${postId}/reactions`, { reactionType: reaction });
}
