import { ReactionType } from "@/models/Enums/reaction";
import { Pagination } from "@/models/Pagination/pagination";
import axios from "@/plugins/axios";
import { Comment } from "@/models/comment";

export async function postComment(postId: string, message: string): Promise<Comment> {
  const response = await axios.post(`/api/posts/${postId}/comments`, { message: message });
  return response.data;
}

export async function getPostComments(postId: string, page: number, size: number): Promise<Pagination<Comment>> {
  const response = await axios.get(`/api/posts/${postId}/comments`, { params: { page, size } });
  return response.data;
}

export async function postCommentReaction(commentId: string, reaction: ReactionType | null): Promise<void> {
  await axios.post(`/api/comments/${commentId}/reactions`, { reactionType: reaction });
}

export async function deleteComment(postId: string, commentId: string): Promise<void> {
  await axios.delete(`/api/posts/${postId}/comments/${commentId}`);
}
