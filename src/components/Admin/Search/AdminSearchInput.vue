<template>
  <div>
    <v-row justify="center" no-gutters>
      <v-col cols="5" class="ml-2 mr-8">
        <v-form>
          <v-text-field
            hide-no-data
            hide-details
            clearable
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            :label="$i18n.t('search')"
            solo
            background-color="grey_input"
            flat
            height="48"
            @keydown.enter.prevent="searchUsersWithFilters"
          ></v-text-field>
        </v-form>
      </v-col>

      <v-col cols="2">
        <v-select
          v-model="orderOptionSelected"
          :items="orderOptions"
          item-value="value"
          item-text="text"
          @change="changeOrderBy"
          hide-details
          hide-no-data
          flat
          solo
          height="48"
          background-color="grey_input"
          :label="$i18n.t('orderBy')"
          width="35%"
          class="mx-2"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="filterOptionSelected"
          :items="filterOptions"
          item-value="value"
          item-text="text"
          @change="changeRole"
          hide-details
          hide-no-data
          flat
          solo
          height="48"
          background-color="grey_input"
          label="Role"
          width="35%"
          class="mx-2"
        ></v-select>
      </v-col>
      <v-col cols="2">
        <v-select
          v-model="orderAscDescSelected"
          :items="orderAscDescOptions"
          item-value="value"
          item-text="text"
          @change="changeOrderAscDesc"
          hide-details
          hide-no-data
          flat
          solo
          height="48"
          background-color="grey_input"
          label="ASC"
          width="15%"
          class="mx-2"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Pagination } from "@/models/Pagination/pagination";
// import { i18n } from "@/main";
import { Role } from "@/models/Enums/role";
import { GetAdminUser } from "@/models/admin";
import { AdminsOptionsOrderBy } from "@/models/Enums/adminOptionsOrderBy";
import { AdminsOptionsSortBy } from "@/models/Enums/adminsOptionsSortBy";

type OrderBy = {
  value: Role;
  text: string;
};

type Filter = {
  value: AdminsOptionsSortBy;
  text: string;
};

type OrderAscDesc = {
  value: AdminsOptionsOrderBy;
  text: string;
};

type SearchUserFunction =
  | null
  | ((
      partialName: string,
      role: Role,
      sortBy?: AdminsOptionsSortBy,
      orderBy?: AdminsOptionsOrderBy,
      page?: number,
      size?: number
    ) => Promise<Pagination<GetAdminUser>>);

export default Vue.extend({
  name: "AdminSearchInput",

  props: {
    searchFunction: Function as PropType<SearchUserFunction>,
    cleanSearchInputs: Boolean
  },

  data: () => ({
    page: 1,
    adminPagination: [] as Pagination<GetAdminUser>[],
    filterOptions: [
      { value: Role.ADMIN, text: "Administrators" },
      { value: Role.USER, text: "Users" }
    ] as OrderBy[],
    filterOptionSelected: "" as Role,
    orderOptions: [
      { value: AdminsOptionsSortBy.FULLNAME, text: "Full Name" },
      { value: AdminsOptionsSortBy.BLOCKED, text: "Blocked" }
    ] as Filter[],
    orderOptionSelected: "" as AdminsOptionsSortBy,
    orderAscDescOptions: [
      { value: AdminsOptionsOrderBy.ASC, text: "ASC" },
      { value: AdminsOptionsOrderBy.DESC, text: "DESC" }
    ] as OrderAscDesc[],
    orderAscDescSelected: "" as AdminsOptionsOrderBy
  }),

  methods: {
    async searchUsersWithFilters() {
      if (this.searchFunction) {
        const result = await this.searchFunction(
          this.$store.state.adminPaginationModule.search,
          this.$store.state.adminPaginationModule.role,
          this.$store.state.adminPaginationModule.sortBy,
          this.$store.state.adminPaginationModule.orderBy,
          this.$store.state.adminPaginationModule.page,
          this.$store.state.adminPaginationModule.size
        );
        this.$store.commit("adminPaginationModule/SET_ADMIN_PAGINATION", result);
      }
    },
    async changeOrderBy() {
      this.$store.commit("adminPaginationModule/SET_SORT_BY", this.orderOptionSelected);
      await this.searchUsersWithFilters();
    },
    async changeRole() {
      this.$store.commit("adminPaginationModule/SET_ROLE", this.filterOptionSelected);
      await this.searchUsersWithFilters();
    },
    async changeOrderAscDesc() {
      this.$store.commit("adminPaginationModule/SET_ORDER_BY", this.orderAscDescSelected);
      await this.searchUsersWithFilters();
    }
  },

  computed: {
    search: {
      get(): string {
        return this.$store.state.adminPaginationModule.search;
      },
      async set(value: string) {
        console.log(value);
        this.$store.commit("adminPaginationModule/SET_SEARCH_TEXT", value);
        if (!value) {
          await this.searchUsersWithFilters();
        }
      }
    }
  }
});
</script>

<style scoped></style>
