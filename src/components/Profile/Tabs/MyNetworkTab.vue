<template>
  <div>
    <UserSearchInput
      :searchFunction="searchFunction"
      :usersPerPage="usersPerPage"
      :cleanSearchInputs="cleanSearch"
    ></UserSearchInput>
    <v-tabs v-model="tab" background-color="transparent" color="primary" centered class="mt-13">
      <v-tabs-slider></v-tabs-slider>

      <v-tab background-color="primary" v-for="item in items" :key="item.tab">
        <v-icon class="pr-2" size="20">{{ item.icon }}</v-icon> <span class="caption">{{ item.tab }}</span></v-tab
      >
    </v-tabs>

    <v-divider class="mx-16 mb-6"></v-divider>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="(item, index) in items" :key="item.tab" replace>
        <component
          :is="item.content"
          class="mt-7"
          @decrementContact="$emit('decrementContact')"
          @defineFunction="doDefineFunction"
          v-bind="{ ...paginationUser }"
          v-if="tab == index"
        >
        </component>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script lang="ts">
import Vue, { Component } from "vue";
import UserSearchInput from "@/components/UserSearchInput.vue";
import { i18n } from "@/main";
import ContactsTab from "@/components/Profile/Tabs/NetworkTabs/ContactsTab.vue";
import FollowsTab from "@/components/Profile/Tabs/NetworkTabs/FollowsTabs.vue";
import { Pagination } from "@/models/Pagination/pagination";
import { User } from "@/models/user";
import { UsersOptionsOrderBy } from "@/models/Enums/usersOptionsOrderBy";

type TabsTitles = {
  name?: string;
  content: Component;
  tab: string;
  icon: string;
};

type SearchUserFunction = null | (() => Promise<Pagination<User>>);

export default Vue.extend({
  name: "MyNetworkTab",

  components: { UserSearchInput, ContactsTab, FollowsTab },

  data: () => ({
    tab: null,
    items: [
      {
        name: "contacts",
        content: ContactsTab,
        tab: i18n.t("ViewProfile.contacts").toString(),
        icon: "mdi-account-multiple"
      },
      {
        name: "followings",
        content: FollowsTab,
        tab: i18n.t("ViewProfile.followings").toString(),
        icon: "mdi-account-arrow-right"
      }
    ] as TabsTitles[],
    searchFunction: null as SearchUserFunction,
    usersPerPage: 0,
    paginationUser: {} as Pagination<User>,
    cleanSearch: false
  }),

  methods: {
    doDefineFunction(searchFunction: SearchUserFunction) {
      this.searchFunction = searchFunction;
    },
    setSearchResult(result: Pagination<User>) {
      this.paginationUser = result;
    }
  },

  watch: {
    tab() {
      this.$store.commit("userPaginationModule/SET_ORDER_BY", UsersOptionsOrderBy.FULLNAME);
      this.$store.commit("userPaginationModule/SET_SEARCH_TEXT", "");
      this.$store.commit("userPaginationModule/SET_COUNTRY", "");
      this.$store.commit("userPaginationModule/SET_SKILL", "");
      this.cleanSearch = !this.cleanSearch;
    },
    "$store.state.userModule.user.language": function () {
      this.items[0].tab = i18n.t("ViewProfile.contacts").toString();
      this.items[1].tab = i18n.t("ViewProfile.followings").toString();
    }
  }
});
</script>

<style scoped></style>
