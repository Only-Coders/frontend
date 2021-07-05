import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Role } from "@/models/Enums/role";

export type UserData = {
  imageURI: string;
  fullName: string;
  canonicalName: string;
  roles: Role;
  complete: boolean;
  defaultPrivacy: boolean;
  sub: string;
  currentPosition: string;
  eliminationDate: string;
  language: string;
};

@Module({ name: "userModule", namespaced: true })
export default class User extends VuexModule {
  user: UserData | null = null;

  @Mutation
  SET_USER(value: UserData): void {
    this.user = value;
  }

  @Mutation
  CLEAR_USER(): void {
    this.user = null;
  }

  @Mutation
  SET_USER_IMAGE(imageURI: string): void {
    if (this.user) {
      this.user.imageURI = imageURI;
    }
  }

  @Mutation
  SET_USER_FULLNAME(fullName: string): void {
    if (this.user) {
      this.user.fullName = fullName;
    }
  }

  @Mutation
  SET_USER_ELIMINATION_DATE(eliminationDate: string): void {
    if (this.user) {
      this.user.eliminationDate = eliminationDate;
    }
  }

  @Mutation
  SET_USER_LANGUAGE(language: string): void {
    if (this.user) {
      this.user.language = language;
    }
  }
}
