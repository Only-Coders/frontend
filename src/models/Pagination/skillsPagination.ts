import { Skill } from "@/models/skills";

export type SkillPagination = {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  content: Skill[];
};
