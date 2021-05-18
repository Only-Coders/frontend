import { Institution } from "@/models/institution";

export type SkillPagination = {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  content: Institution[];
};
