import axios from "@/plugins/axios";
import { Post } from "@/models/post";
import { Pagination } from "@/models/Pagination/pagination";
import { GetPost } from "@/models/post";

export async function post(post: Post): Promise<GetPost> {
  const response = await axios.post(`/api/posts`, post);
  return response.data;
}

export async function getPost(): Promise<Pagination<GetPost>> {
  const response = await axios.get(`/api/feed-posts`);
  return response.data;
}
