import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Role } from "@/models/Enums/role";

export type UserData = {
  imageURI: string;
  fullName: string;
  canonicalName: string;
  roles: Role;
  complete: string;
  defaultPrivacy: boolean;
  sub: string;
  currentPosition: string;
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
}
