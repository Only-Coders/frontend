import axios from "@/plugins/axios";
import { StudyExperience } from "@/models/experience";
import { Skill } from "@/models/skills";
import { Pagination } from "@/models/Pagination/pagination";

export async function getInstitutes(instituteName: string): Promise<Pagination<Skill>> {
  const response = await axios.get(`/api/institutes`, { params: { instituteName } });
  return response.data;
}

export async function postInstitute(experience: StudyExperience): Promise<StudyExperience> {
  const response = await axios.post(`/api/users/institutes`, experience);
  return response.data;
}
