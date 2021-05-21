import { Module, VuexModule, Mutation } from "vuex-module-decorators";

export type UserData = {
  imageURI: string;
  firstName: string;
  lastName: string;
  canonicalName: string;
  role: string;
  completed: string;
};

@Module({ name: "userModule", namespaced: true })
export default class User extends VuexModule {
  user: UserData | null = null;

  @Mutation
  SET_USER(value: UserData) {
    this.user = value;
  }

  @Mutation
  CLEAR_USER() {
    this.user = null;
  }
}
