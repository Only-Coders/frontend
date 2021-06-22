<template>
  <v-tabs vertical>
    <v-tab>Administrators</v-tab>
    <v-tab>Users</v-tab>
    <v-tab-item class="mx-10">
      <!-- <v-row no-gutters class="d-flex justify-center">
        <v-col cols="12">
          <v-card class="mt-12" min-height="85vh">
            <UserSearchInput class="pt-4" :searchFunction="searchUsers" :usersPerPage="usersPerPage"></UserSearchInput>
            <v-divider class="mb-6 mx-4 mx-md-8 mt-8"></v-divider>

            <v-row no-gutters class="d-flex justify-center" v-if="userPagination.content.length !== 0">
              <v-col cols="9">
                <div v-for="user in userPagination.content" :key="user.canonicalName" class="my-8">
                  <UserCompontent :adminData="user"></UserCompontent>
                </div>
                <v-pagination
                  class="my-10"
                  v-if="userPagination && userPagination.totalPages > 1"
                  v-model="currentPage"
                  :length="userPagination.totalPages"
                  :total-visible="7"
                  @input="nextPage"
                ></v-pagination>
              </v-col>
            </v-row>
            <v-row v-else no-gutters class="d-flex justify-center align-center py-16">
              <v-col cols="9"> <NoData></NoData> </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row> -->
    </v-tab-item>
    <v-tab-item class="mx-8">
      <v-row no-gutters class="d-flex justify-center">
        <v-col cols="12">
          <v-card class="mt-12" min-height="85vh">
            <UserSearchInput class="pt-4" :searchFunction="searchUsers" :usersPerPage="usersPerPage"></UserSearchInput>
            <v-divider class="mb-6 mx-4 mx-md-8 mt-8"></v-divider>

            <v-row no-gutters class="d-flex justify-center" v-if="userPagination.content.length !== 0">
              <v-col cols="9">
                <div v-for="user in userPagination.content" :key="user.canonicalName" class="my-8">
                  <UserCompontent :adminData="user"></UserCompontent>
                </div>
                <v-pagination
                  class="my-10"
                  v-if="userPagination && userPagination.totalPages > 1"
                  v-model="currentPage"
                  :length="userPagination.totalPages"
                  :total-visible="7"
                  @input="nextPage"
                ></v-pagination>
              </v-col>
            </v-row>
            <v-row v-else no-gutters class="d-flex justify-center align-center py-16">
              <v-col cols="9"> <NoData></NoData> </v-col>
            </v-row>
          </v-card>
        </v-col> </v-row
    ></v-tab-item>
  </v-tabs>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import UserCompontent from "@/components/Admin/User.vue";
import NoData from "@/components/NoData.vue";
// import { Admin } from "@/models/admin";
// import { getAdmin } from "@/services/admin";
import { getUser } from "@/services/user";
import { UsersOptionsOrderBy } from "@/models/Enums/usersOptionsOrderBy";
import { Pagination } from "@/models/Pagination/pagination";
import { Profile } from "@/models/profile";
import UserSearchInput from "@/components/UserSearchInput.vue";

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
    searchUsers(
      page: number,
      size: number,
      orderBy: UsersOptionsOrderBy,
      partialName: string,
      countryName: string,
      skillName: string
    ) {
      return getUser({ partialName, orderBy, page, size, countryName, skillName });
    },
    async nextPage() {
      const result = await getUser({
        partialName: this.$store.state.userPaginationModule.search,
        orderBy: this.$store.state.userPaginationModule.orderBySelected,
        page: this.currentPage - 1,
        size: 5,
        countryName: this.$store.state.userPaginationModule.country,
        skillName: this.$store.state.userPaginationModule.skill
      });
      this.currentPage = result.currentPage + 1;
      this.$store.commit("userPaginationModule/SET_USER_PAGINATION", result);
    }
  },

  computed: {
    userPagination: {
      get(): Pagination<Profile> {
        return this.$store.state.userPaginationModule.userPagination;
      }
    }
  },

  async created() {
    const result = await getUser({
      partialName: "",
      size: 5,
      page: 0,
      orderBy: UsersOptionsOrderBy.FIRSTNAME
    });
    this.$store.commit("userPaginationModule/SET_USER_PAGINATION", result);
    this.$store.commit("userPaginationModule/SET_USER_PER_PAGE", 9);
  }
});
</script>

<style lang="scss" scoped></style>
