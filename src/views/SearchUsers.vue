<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-col cols="8">
      <v-card class="mt-12" min-height="85vh">
        <UserSearchInput class="pt-4" :searchFunction="searchUsers" :usersPerPage="usersPerPage"></UserSearchInput>
        <v-divider class="mb-6 mx-4 mx-md-8 mt-8"></v-divider>

        <v-row no-gutters class="d-flex justify-center" v-if="userPagination.content.length !== 0">
          <v-col cols="9">
            <div v-for="user in userPagination.content" :key="user.canonicalName" class="my-8">
              <Contact :contactData="user"></Contact>
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
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import UserSearchInput from "@/components/UserSearchInput.vue";
import Contact from "@/components/Search/Contact.vue";
import { Profile } from "@/models/profile";
import { getUser } from "@/services/user";
import { Pagination } from "@/models/Pagination/pagination";
import { UsersOptionsOrderBy } from "@/models/Enums/usersOptionsOrderBy";
import NoData from "@/components/NoData.vue";
export default Vue.extend({
  name: "SearchUsersView",
  components: { UserSearchInput, Contact, NoData },
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
  }
});
</script>

<style>
.search__divider {
  border-color: #b3b3b3 !important;
}
.search__progress {
  height: 150px;
}
</style>
