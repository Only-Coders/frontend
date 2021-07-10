import axios from "@/plugins/axios";
import { UserWorkExperience, WorkExperience } from "@/models/experience";
import { Pagination } from "@/models/Pagination/pagination";
import { Organization } from "@/models/organization";

export async function getOrganizations(workplaceName: string): Promise<Pagination<Organization>> {
  const response = await axios.get(`/api/workplaces`, { params: { workplaceName } });
  return response.data;
}

export async function postOrganization(experience: WorkExperience): Promise<UserWorkExperience> {
  const response = await axios.post(`/api/users/workplaces`, experience);
  return response.data;
}

export async function getWorksOfUser(
  canonicalName: string,
  page: number,
  size?: number
): Promise<Pagination<UserWorkExperience>> {
  const response = await axios.get(`/api/users/${canonicalName}/workplaces`, { params: { page, size } });
  return response.data;
}

export async function deleteWorkExperience(id: string): Promise<void> {
  await axios.delete(`/api/users/workplaces/${id}`);
}

export async function updateWorkExperience(id: string, experience: WorkExperience): Promise<UserWorkExperience> {
  const response = await axios.put(`/api/users/workplaces/${id}`, {
    id: experience.id,
    name: experience.name,
    position: experience.position,
    since: experience.since,
    until: experience.until
  });
  return response.data;
}
