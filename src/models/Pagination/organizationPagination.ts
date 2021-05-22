import { Organization } from "@/models/organization";

export type SkillPagination = {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  content: Organization[];
};
