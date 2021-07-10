import axios from "@/plugins/axios";
import { StudyExperience, UserStudyExperience } from "@/models/experience";
import { Pagination } from "@/models/Pagination/pagination";
import { Institution } from "@/models/institution";

export async function getInstitutes(instituteName: string): Promise<Pagination<Institution>> {
  const response = await axios.get(`/api/institutes`, { params: { instituteName } });
  return response.data;
}

export async function postInstitute(experience: StudyExperience): Promise<UserStudyExperience> {
  const response = await axios.post(`/api/users/institutes`, experience);
  return response.data;
}

export async function getStudiesOfUser(
  canonicalName: string,
  page: number,
  size?: number
): Promise<Pagination<UserStudyExperience>> {
  const response = await axios.get(`/api/users/${canonicalName}/institutes`, { params: { page, size } });
  return response.data;
}

export async function deleteInstitute(id: string): Promise<void> {
  await axios.delete(`/api/users/institutes/${id}`);
}

export async function updateInstitute(id: string, experience: StudyExperience): Promise<UserStudyExperience> {
  const response = await axios.put(`/api/users/institutes/${experience.id}`, {
    name: experience.name,
    degree: experience.degree,
    since: experience.since,
    until: experience.until
  });
  return response.data;
}
