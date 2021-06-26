import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { User } from "@/models/user";
import { Pagination } from "@/models/Pagination/pagination";

@Module({ name: "userPaginationModule", namespaced: true })
export default class adminPagination extends VuexModule {
  adminPagination: Pagination<User> | null = null;
  search = "";
  usersPerPage = 1;
  country = "";
  skill = "";
  orderBySelected = "FULLNAME";

  @Mutation
  SET_USER_PAGINATION(value: Pagination<User>): void {
    this.adminPagination = value;
  }

  @Mutation
  CLEAR_USER_PAGINATION(): void {
    this.adminPagination = null;
  }

  @Mutation
  SET_SEARCH_TEXT(value: string): void {
    this.search = value;
  }

  @Mutation
  SET_USER_PER_PAGE(value: number): void {
    this.usersPerPage = value;
  }

  @Mutation
  SET_COUNTRY(value: string): void {
    this.country = value;
  }

  @Mutation
  SET_SKILL(value: string): void {
    this.skill = value;
  }

  @Mutation
  SET_ORDER_BY(value: string): void {
    this.orderBySelected = value;
  }
}
