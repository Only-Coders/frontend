import axios from "@/plugins/axios";
import { WorkExperience } from "@/models/experience";
import { Pagination } from "@/models/Pagination/pagination";
import { Organization } from "@/models/organization";

export async function getOrganizations(workplaceName: string): Promise<Pagination<Organization>> {
  const response = await axios.get(`/api/workplaces`, { params: { workplaceName } });
  return response.data;
}

export async function postOrganization(experience: WorkExperience): Promise<WorkExperience> {
  const response = await axios.post(`/api/users/workplaces`, experience);
  return response.data;
}
