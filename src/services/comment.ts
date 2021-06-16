import axios from "@/plugins/axios";

export async function postComment(postId: string, message: string): Promise<void> {
  await axios.post(`/api/posts/${postId}/comments`, message);
}
