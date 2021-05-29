export type Pagination<T> = {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  content: T[];
};
