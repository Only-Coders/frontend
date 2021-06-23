import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Admin } from "@/models/admin";
import { Pagination } from "@/models/Pagination/pagination";
import { AccountStatus } from "@/models/Enums/accountStatus";
import { Role } from "@/models/Enums/role";

@Module({ name: "adminPaginationModule", namespaced: true })
export default class AdminPagination extends VuexModule {
  adminPagination: Pagination<Admin> | null = null;
  search = ""; //partialName
  adminsPerPage = 1;
  accountStatus: AccountStatus | null = null;
  role: Role | null = null;
  orderBySelected = "DESC";
  sortBySelected = "FULLNAME";

  @Mutation
  SET_ADMIN_PAGINATION(value: Pagination<Admin>): void {
    this.adminPagination = value;
  }

  @Mutation
  CLEAR_ADMIN_PAGINATION(): void {
    this.adminPagination = null;
  }

  @Mutation
  SET_SEARCH_TEXT(value: string): void {
    this.search = value;
  }

  @Mutation
  SET_ADMIN_PER_PAGE(value: number): void {
    this.adminsPerPage = value;
  }

  @Mutation
  SET_ACCOUNT_STATUS(value: AccountStatus): void {
    this.accountStatus = value;
  }

  @Mutation
  SET_ORDER_BY(value: string): void {
    this.orderBySelected = value;
  }

  @Mutation
  SET_SORT_BY(value: string): void {
    this.sortBySelected = value;
  }
}
