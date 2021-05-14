import axios from "@/plugins/axios";
import { SkillPagination } from "@/models/skillsPagination";

export async function get(skillName: string): Promise<{ skillPagination: SkillPagination }> {
  const response = await axios.get(`/api/skills`, { params: { skillName } });
  return response.data;
}
