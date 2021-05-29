import axios from "@/plugins/axios";
import { Skill } from "@/models/skills";
import { Pagination } from "@/models/Pagination/pagination";

export async function get(skillName: string): Promise<Pagination<Skill>> {
  const response = await axios.get(`/api/skills`, { params: { skillName } });
  return response.data;
}

export async function post(skill: Skill): Promise<void> {
  await axios.post(`/api/users/skills`, skill);
}
