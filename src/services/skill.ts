import axios from "@/plugins/axios";
import { SkillPagination } from "@/models/Pagination/skillsPagination";
import { Skill } from "@/models/skills";

export async function get(skillName: string): Promise<SkillPagination> {
  const response = await axios.get(`/api/skills`, { params: { skillName } });
  return response.data;
}

export async function post(skill: Skill): Promise<void> {
  await axios.post(`/api/users/skills`, skill);
}
