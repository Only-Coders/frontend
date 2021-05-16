import axios from "@/plugins/axios";
import { SkillPagination } from "@/models/Pagination/organizationPagination";
import { Organization } from "@/models/organization";

export async function getOrganizations(organizationName: string): Promise<SkillPagination> {
  const response = await axios.get(`/api/organizations`, { params: { organizationName } });
  return response.data;
}

export async function postOrganization(name: string): Promise<Organization> {
  const response = await axios.post(`/api/organizations`, { name });
  return response.data;
}
