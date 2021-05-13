export type SkillPagination = {
  currentPage: number;
  totalElements: number;
  totalPages: number;
  content: [
    {
      name: "string";
      canonicalName: "string";
    }
  ];
};
