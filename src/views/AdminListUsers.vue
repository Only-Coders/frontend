<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-col cols="12">
      <v-card class="mt-12" min-height="85vh">
        <UserSearchInput class="pt-4" :searchFunction="searchUsers" :usersPerPage="usersPerPage"></UserSearchInput>
        <v-divider class="mb-6 mx-4 mx-md-8 mt-8"></v-divider>

        <v-row no-gutters class="d-flex justify-center" v-if="adminPagination.content.length !== 0">
          <v-col cols="9">
            <div v-for="user in adminPagination.content" :key="user.canonicalName" class="my-8">
              <UserCompontent :adminData="user"></UserCompontent>
            </div>
            <v-pagination
              class="my-10"
              v-if="adminPagination && adminPagination.totalPages > 1"
              v-model="currentPage"
              :length="adminPagination.totalPages"
              :total-visible="7"
              @input="nextPageUsers"
            ></v-pagination>
          </v-col>
        </v-row>
        <v-row v-else no-gutters class="d-flex justify-center align-center py-16">
          <v-col cols="9"> <NoData></NoData> </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import UserCompontent from "@/components/Admin/User.vue";
import NoData from "@/components/NoData.vue";
import { getAdminUsers } from "@/services/admin";
import { Pagination } from "@/models/Pagination/pagination";
import UserSearchInput from "@/components/UserSearchInput.vue";
import { Role } from "@/models/Enums/role";
import { Admin } from "@/models/admin";
import { AdminsOptionsSortBy } from "@/models/Enums/adminsOptionsSortBy";
import { AdminsOptionsOrderBy } from "@/models/Enums/adminOptionsOrderBy";

export default (Vue as VueConstructor<Vue>).extend({
  name: "AdminListUsers",

  components: {
    UserCompontent,
    UserSearchInput,
    NoData
  },

  props: {},

  mixins: [],

  data: () => ({
    usersPerPage: 5,
    currentPage: 1
  }),

  methods: {
    searchUsers() {
      return getAdminUsers("ma", Role.USER);
    },
    async nextPageUsers() {
      const result = await getAdminUsers(
        this.$store.state.adminPaginationModule.search,
        Role.USER,
        this.$store.state.adminPaginationModule.orderBySelected,
        this.$store.state.adminPaginationModule.sortBySelected,
        this.currentPage - 1,
        5
      );
      this.currentPage = result.currentPage + 1;
      this.$store.commit("adminPaginationModule/SET_ADMIN_PAGINATION", result);
    }
  },

  computed: {
    adminPagination: {
      get(): Pagination<Admin> {
        return this.$store.state.adminPaginationModule.adminPagination;
      }
    }
  },

  async created() {
    const result = await getAdminUsers("", Role.USER, AdminsOptionsSortBy.FULLNAME, AdminsOptionsOrderBy.DESC, 0, 5);
    this.$store.commit("adminPaginationModule/SET_ADMIN_PAGINATION", result);
    this.$store.commit("adminPaginationModule/SET_ADMIN_PER_PAGE", 9);
  }
});
</script>

<style lang="scss" scoped></style>
