import axios from "@/plugins/axios";
import { SkillPagination } from "@/models/Pagination/organizationPagination";
import { WorkExperience } from "@/models/experience";

export async function getOrganizations(workplaceName: string): Promise<SkillPagination> {
  const response = await axios.get(`/api/workplaces`, { params: { workplaceName } });
  return response.data;
}

export async function postOrganization(experience: WorkExperience): Promise<WorkExperience> {
  const response = await axios.post(`/api/users/workplaces`, experience);
  return response.data;
}
