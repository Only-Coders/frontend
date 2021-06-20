<template>
  <v-card class="px-4 pt-1" rounded>
    <div v-if="shouldRenderRecents">
      <v-row class="d-flex justify-space-between align-center mt-4" no-gutters>
        <v-col>
          <v-card-title class="font-weight-light pt-0"
            ><h3 class="font-weight-light">{{ $i18n.t("Search.recent") }}</h3></v-card-title
          >
        </v-col>
        <v-col class="d-flex flex-row-reverse">
          <v-btn text @click="clearHistory">
            <p class="font-weight-bold text--secondary text-capitalize pb-0 my-auto">{{ $i18n.t("Search.delete") }}</p>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col
          cols="2"
          class="d-flex flex-column align-center user_name"
          v-for="recentSearch in recentSearches"
          :key="recentSearch.canonicalName"
          @click="goToProfile(recentSearch)"
        >
          <v-avatar size="50">
            <v-img
              alt="user"
              class="mb-2"
              width="60"
              :src="recentSearch.imageURI ? recentSearch.imageURI : require('@/assets/images/default-avatar.png')"
            />
          </v-avatar>
          <h4 class="font-weight-light text-center">{{ recentSearch.fullName }}</h4>
        </v-col>
      </v-row>
    </div>
    <v-row v-else class="mt-8">
      <v-col>
        <div v-if="!areUsersLoading">
          <v-list>
            <v-list-item
              v-for="contact in filteredUsers.content"
              :key="contact.canonicalName"
              :to="`/profile/${contact.canonicalName}`"
              @click="storeRecentSearch(contact)"
              link
            >
              <Contact :contactData="contact"></Contact>
            </v-list-item>
          </v-list>
        </div>
        <div v-else class="d-flex justify-center align-center search__progress">
          <v-progress-circular :size="30" color="grey" indeterminate></v-progress-circular>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-row-reverse" no-gutters>
      <v-col cols="auto">
        <v-btn @click="redirectSearchUsers" text>
          <p class="font-weight-bold text--secondary text-capitalize mb-0">{{ $i18n.t("Search.seeAll") }}</p></v-btn
        >
      </v-col>
    </v-row>
    <v-divider class="search__divider"></v-divider>
    <v-row class="mt-4" no-gutters>
      <v-col>
        <v-card-title class="font-weight-light py-0"
          ><h4 class="font-weight-light">{{ $i18n.t("Search.try") }}</h4></v-card-title
        >
        <v-list v-if="!areTagsLoading">
          <v-list-item v-for="tag in tags" :key="tag.canonicalName">
            <v-list-item-icon class="mr-2">
              <v-list-item-icon class="ma-0">
                <v-icon size="20">mdi-pound</v-icon>
              </v-list-item-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ tag.canonicalName }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div v-else class="d-flex justify-center align-center search__progress">
          <v-progress-circular :size="30" color="grey" indeterminate></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { User } from "@/models/user";
import { addRecentSearch, clearRecentSearches, getRecentSearches } from "@/services/recentSearch";
import { Tag } from "@/models/tag";
import Contact from "@/components/Feed/SearchContact.vue";
import { Pagination } from "@/models/Pagination/pagination";
import { RecentSearch } from "@/models/recentSearch";

export default Vue.extend({
  name: "Search",

  components: { Contact },

  data: () => ({
    recentSearches: [] as RecentSearch[]
  }),

  props: {
    filteredUsers: {} as PropType<Pagination<User>>,
    tags: Array as PropType<Tag[]>,
    areTagsLoading: Boolean,
    areUsersLoading: Boolean,
    filters: String
  },

  methods: {
    async clearHistory() {
      await clearRecentSearches();
      this.recentSearches = [];
    },
    async storeRecentSearch(contact: User) {
      await addRecentSearch({
        canonicalName: contact.canonicalName,
        fullName: contact.fullName,
        imageURI: contact.imageURI
      });
    },
    async goToProfile(recentSearch: RecentSearch) {
      this.$router.push(`/profile/${recentSearch.canonicalName}`);
      await addRecentSearch({
        canonicalName: recentSearch.canonicalName,
        fullName: recentSearch.fullName,
        imageURI: recentSearch.imageURI
      });
    },
    redirectSearchUsers() {
      this.$store.commit("userPaginationModule/SET_USER_PAGINATION", this.filteredUsers);
      this.$store.commit("userPaginationModule/SET_SEARCH_TEXT", this.filters);
      this.$store.commit("userPaginationModule/SET_USER_PER_PAGE", 5);
      this.$router.push({ path: "/search/results/all", query: { keywords: this.filters } });
    }
  },
  computed: {
    shouldRenderRecents(): boolean {
      return (
        (this.filters.length === 0 && this.recentSearches.length !== 0) ||
        (this.filteredUsers && this.filteredUsers.content && this.filteredUsers.content.length === 0)
      );
    }
  },
  async created() {
    this.recentSearches = await getRecentSearches();
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

.user_name {
  cursor: pointer;
}
</style>
