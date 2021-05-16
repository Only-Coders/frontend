import { Tag } from "@/models/tag";

export type TagPagination = {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  content: Tag[];
};
