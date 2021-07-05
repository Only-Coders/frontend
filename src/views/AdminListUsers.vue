<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-col cols="8">
      <v-card class="mt-0">
        <AdminSearchInput class="pt-4" :searchFunction="searchUsers" :usersPerPage="usersPerPage"></AdminSearchInput>
        <v-divider class="mb-6 mx-4 mx-md-8 mt-8"></v-divider>

        <v-row no-gutters class="d-flex justify-center" v-if="adminPagination && adminPagination.content.length !== 0">
          <v-col cols="9">
            <div v-for="(user, index) in adminPagination.content" :key="user.canonicalName" class="my-8">
              <UserCompontent :data="user" @deleteUserFromCollection="deleteUser(index)"></UserCompontent>
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
import { Role } from "@/models/Enums/role";
import AdminSearchInput from "@/components/Admin/Search/AdminSearchInput.vue";
import { GetAdminUser } from "@/models/admin";
import { AdminsOptionsSortBy } from "@/models/Enums/adminsOptionsSortBy";
import { AdminsOptionsOrderBy } from "@/models/Enums/adminOptionsOrderBy";

export default (Vue as VueConstructor<Vue>).extend({
  name: "AdminListUsers",

  components: {
    UserCompontent,
    AdminSearchInput,
    NoData
  },

  props: {},

  mixins: [],

  data: () => ({
    usersPerPage: 5,
    currentPage: 1
  }),

  methods: {
    async deleteUser(index: number) {
      let currentUsersCollection = this.$store.state.adminPaginationModule.adminPagination.content;
      currentUsersCollection.splice(index, 1);
      if (!currentUsersCollection.length) {
        if (this.currentPage !== this.$store.state.adminPaginationModule.adminPagination.totalPages) {
          const result = await getAdminUsers(
            this.$store.state.adminPaginationModule.search,
            this.$store.state.adminPaginationModule.role,
            this.$store.state.adminPaginationModule.sortBy,
            this.$store.state.adminPaginationModule.orderBy,
            this.currentPage - 1,
            5
          );
          this.$store.commit("adminPaginationModule/SET_ADMIN_PAGINATION", result);
        } else {
          const result = await getAdminUsers(
            this.$store.state.adminPaginationModule.search,
            this.$store.state.adminPaginationModule.role,
            this.$store.state.adminPaginationModule.sortBy,
            this.$store.state.adminPaginationModule.orderBy,
            this.$store.state.adminPaginationModule.adminPagination.totalPages - 1,
            5
          );
          this.$store.commit("adminPaginationModule/SET_ADMIN_PAGINATION", result);
        }
      } else {
        this.$store.commit("adminPaginationModule/SET_ADMIN_DELETION", currentUsersCollection);
      }
    },
    searchUsers(
      partialName: string,
      role: Role,
      sortBy?: AdminsOptionsSortBy,
      orderBy?: AdminsOptionsOrderBy,
      page?: number,
      size?: number
    ) {
      return getAdminUsers(partialName, role, sortBy, orderBy, page, size);
    },
    async nextPageUsers() {
      const result = await getAdminUsers(
        this.$store.state.adminPaginationModule.search,
        this.$store.state.adminPaginationModule.role,
        this.$store.state.adminPaginationModule.sortBy,
        this.$store.state.adminPaginationModule.orderBy,
        this.currentPage - 1,
        5
      );
      this.currentPage = result.currentPage + 1;
      this.$store.commit("adminPaginationModule/SET_ADMIN_PAGINATION", result);
    }
  },

  computed: {
    adminPagination: {
      get(): Pagination<GetAdminUser> {
        return this.$store.state.adminPaginationModule.adminPagination;
      }
    }
  },

  async created() {
    const result = await getAdminUsers(
      this.$store.state.adminPaginationModule.search,
      this.$store.state.adminPaginationModule.role,
      this.$store.state.adminPaginationModule.sortBy,
      this.$store.state.adminPaginationModule.orderBy,
      0,
      5
    );
    this.currentPage = result.currentPage + 1;
    this.$store.commit("adminPaginationModule/SET_ADMIN_PAGINATION", result);
  }
});
</script>

<style lang="scss" scoped></style>
