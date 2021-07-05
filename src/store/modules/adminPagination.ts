import { Module, VuexModule, Mutation } from "vuex-module-decorators";
import { Admin } from "@/models/admin";
import { Pagination } from "@/models/Pagination/pagination";
import { AccountStatus } from "@/models/Enums/accountStatus";
import { Role } from "@/models/Enums/role";
import { AdminsOptionsSortBy } from "@/models/Enums/adminsOptionsSortBy";
import { AdminsOptionsOrderBy } from "@/models/Enums/adminOptionsOrderBy";
@Module({ name: "adminPaginationModule", namespaced: true })
export default class AdminPagination extends VuexModule {
  adminPagination: Pagination<Admin> | null = null;
  search = "";
  size = 5;
  page = 0;
  accountStatus: AccountStatus | null = null;
  role: Role = Role.ADMIN;
  orderBy = AdminsOptionsOrderBy.ASC;
  sortBy = AdminsOptionsSortBy.FULLNAME;

  @Mutation
  SET_ADMIN_DELETION(value: Admin[]): void {
    if (this.adminPagination) {
      this.adminPagination.content = value;
    }
  }

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
    this.size = value;
  }

  @Mutation
  SET_ACCOUNT_STATUS(value: AccountStatus): void {
    this.accountStatus = value;
  }

  @Mutation
  SET_ORDER_BY(value: AdminsOptionsOrderBy): void {
    this.orderBy = value;
  }

  @Mutation
  SET_SORT_BY(value: AdminsOptionsSortBy): void {
    this.sortBy = value;
  }

  @Mutation
  SET_ROLE(value: Role): void {
    this.role = value;
  }

  @Mutation
  SET_PAGE(value: number): void {
    this.page = value;
  }
}
