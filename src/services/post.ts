import axios from "@/plugins/axios";
import { Post } from "@/models/post";

export async function post(post: Post): Promise<void> {
  await axios.post(`/api/posts`, post);
}
