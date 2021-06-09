<template>
  <v-row no-gutters class="d-flex justify-center">
    <v-col cols="6">
      <v-card class="mt-12">
        <UserSearchInput></UserSearchInput>

        <v-divider class="mb-16 mx-4 mx-md-8"></v-divider>

        <div class="mx-4 px-16 pb-16">
          <div v-for="user in filteredUsers" :key="user.canonicalName" class="my-8">
            <Contact :contactData="user"></Contact>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import UserSearchInput from "@/components/UserSearchInput.vue";
import Contact from "@/components/Search/Contact.vue";
import { User } from "@/models/user";
import { getUser } from "@/services/user";
import { getFollows } from "@/services/follow";
import { getContacts } from "@/services/contact";

export default Vue.extend({
  name: "SearchUsersView",

  components: { UserSearchInput, Contact },

  props: {},

  data: () => ({
    searchParameters: "",
    isLoading: false,
    filteredUsers: [] as User[]
  }),

  methods: {
    async searchUsers() {
      const result = await getUser({ partialName: this.searchParameters, size: 20 });
      this.filteredUsers = result.content;
    },

    async filterFollowedUsers() {
      const result = await getFollows(0, 20, "", this.searchParameters);
      console.log("followed: ", result);
    },

    async filterContacts() {
      const result = await getContacts(0, 20, "", this.searchParameters);
      console.log("contacts: ", result);
    }
  },

  async created() {
    this.searchParameters = this.$route.query.keywords as string;
    if (this.searchParameters !== "") {
      this.isLoading = true;
      await this.searchUsers();
      await this.filterFollowedUsers();
      await this.filterContacts();
      this.isLoading = false;
    }
    console.log(this.searchParameters, this.filteredUsers);
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
