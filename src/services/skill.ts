import axios from "@/plugins/axios";
import { SkillPagination } from "@/models/skillsPagination";
import { Skill } from "@/models/skills";

export async function get(skillName: string): Promise<SkillPagination> {
  const response = await axios.get(`/api/skills`, { params: { skillName } });
  return response.data;
}

export async function post(name: string): Promise<Skill> {
  const response = await axios.post(`/api/skills`, { name });
  return response.data;
}
