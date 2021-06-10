import axios from "@/plugins/axios";
import { Skill } from "@/models/skills";
import { Pagination } from "@/models/Pagination/pagination";

export async function getSkill(skillName: string): Promise<Pagination<Skill>> {
  const response = await axios.get(`/api/skills`, { params: { skillName } });
  return response.data;
}

export async function postSkill(skill: Skill): Promise<void> {
  await axios.post(`/api/users/skills`, skill);
}

export async function getSkillsOfUser(canonicalName: string, page: number, size?: number): Promise<Pagination<Skill>> {
  const response = await axios.get(`/api/users/${canonicalName}/skills`, { params: { page, size } });
  return response.data;
}
