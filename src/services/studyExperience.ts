import axios from "@/plugins/axios";
import { SkillPagination } from "@/models/Pagination/institutionPagination";
import { StudyExperience } from "@/models/experience";

export async function getInstitutes(instituteName: string): Promise<SkillPagination> {
  const response = await axios.get(`/api/institutes`, { params: { instituteName } });
  return response.data;
}

export async function postInstitute(experience: StudyExperience): Promise<StudyExperience> {
  const response = await axios.post(`/api/users/institutes`, experience);
  return response.data;
}
