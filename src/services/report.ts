import { PostReport, PostReportType } from "@/models/postReport";
import axios from "@/plugins/axios";

export async function getPostReportTypes(language: string): Promise<PostReportType[]> {
  const response = await axios.get(`/api/report-types`, { params: { language } });
  return response.data;
}

export async function addPostReport(postId: string, postReport: PostReport): Promise<void> {
  await axios.post(`/api/posts/${postId}/reports`, postReport);
}
