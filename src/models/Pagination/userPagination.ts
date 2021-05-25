import { User } from "@/models/user";

export type UserPagination = {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  content: User[];
};
