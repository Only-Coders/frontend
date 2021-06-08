import { Institution } from "./institution";
import { Organization } from "./organization";

export type WorkExperience = {
  id?: string;
  name: string;
  position: string;
  since: string;
  until: string;
};

export type StudyExperience = {
  id?: string;
  name: string;
  degree: string;
  since: string;
  until: string;
};

export type UserWorkExperience = {
  id?: string;
  workplace: Organization;
  position: string;
  since: string;
  until: string;
};

export type UserStudyExperience = {
  id?: string;
  institute: Institution;
  degree: string;
  since: string;
  until: string;
};
