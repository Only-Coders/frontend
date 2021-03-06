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
          <AvatarImagePreview
            :src="recentSearch.imageURI ? recentSearch.imageURI : require('@/assets/images/default-avatar.png')"
            :imageSize="55"
          ></AvatarImagePreview>
          <h4 class="font-weight-light text-center">{{ recentSearch.fullName }}</h4>
        </v-col>
      </v-row>
    </div>
    <v-row v-else class="mt-3">
      <v-col>
        <div v-if="!areUsersLoading">
          <v-list>
            <v-list-item
              v-for="contact in filteredUsers.content"
              :key="contact.canonicalName"
              @click="goToProfile(contact)"
            >
              <SearchContact :contactData="contact"></SearchContact>
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

    <v-divider v-if="tags.length > 0 || filters" class="search__divider"></v-divider>

    <v-row class="mt-4" no-gutters v-if="!filters">
      <v-col v-if="!areTagsLoading && tags.length > 0">
        <v-card-title class="font-weight-light py-0"
          ><h4 class="font-weight-light">{{ $i18n.t("Search.try") }}</h4></v-card-title
        >
        <v-list v-if="!areTagsLoading">
          <TagSearch :tag="tag" :isFollowed="false" v-for="tag in tags" :key="tag.canonicalName"></TagSearch>
        </v-list>
        <div v-else class="d-flex justify-center align-center search__progress">
          <v-progress-circular :size="30" color="grey" indeterminate></v-progress-circular>
        </div>
      </v-col>
    </v-row>

    <v-row class="mt-0" v-if="filters">
      <v-col>
        <div v-if="searchedTags && !areTagsLoading">
          <v-list>
            <TagSearch :tag="tag" :isFollowed="false" v-for="tag in searchedTags" :key="tag.canonicalName"></TagSearch>
          </v-list>
        </div>
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
import SearchContact from "@/components/Feed/SearchContact.vue";
import { Pagination } from "@/models/Pagination/pagination";
import { RecentSearch } from "@/models/recentSearch";
import AvatarImagePreview from "@/components/AvatarImagePreview.vue";
import TagSearch from "@/components/Search/TagSearch.vue";

export default Vue.extend({
  name: "Search",

  components: { SearchContact, AvatarImagePreview, TagSearch },

  data: () => ({
    recentSearches: [] as RecentSearch[]
  }),

  props: {
    filteredUsers: {} as PropType<Pagination<User>>,
    tags: Array as PropType<Tag[]>,
    areTagsLoading: Boolean,
    areUsersLoading: Boolean,
    filters: String,
    searchedTags: Array as PropType<Tag[]>
  },

  methods: {
    async clearHistory() {
      await clearRecentSearches();
      this.recentSearches = [];
    },
    async goToProfile(recentSearch: RecentSearch) {
      addRecentSearch({
        canonicalName: recentSearch.canonicalName,
        fullName: recentSearch.fullName,
        imageURI: recentSearch.imageURI
      }).catch((error) => console.error(error));
      if (this.$router.currentRoute.path === `/profile/${recentSearch.canonicalName}`) {
        this.$emit("closeOverlay");
      } else {
        this.$router.push(`/profile/${recentSearch.canonicalName}`);
      }
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
      if (this.recentSearches.length === 0) return false;
      return (
        this.filters.length === 0 ||
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
