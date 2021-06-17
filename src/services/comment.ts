import axios from "@/plugins/axios";

export async function postComment(postId: string, message: string): Promise<Comment> {
  const response = await axios.post(`/api/posts/${postId}/comments`, { message: message });
  return response.data;
}
