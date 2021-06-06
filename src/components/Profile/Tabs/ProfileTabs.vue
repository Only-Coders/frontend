<template>
  <v-sheet v-if="loading" color="grey lighten-4" class="pa-3">
    <v-skeleton-loader type="list-item-three-line, card-heading, image"></v-skeleton-loader>
  </v-sheet>

  <v-card v-else>
    <v-tabs
      v-model="tab"
      background-color="transparent"
      color="secondary"
      fixed-tabs
      icons-and-text
      class="tab-container"
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab background-color="primary" v-for="item in filteredTabs" :key="item.tab">
        {{ item.tab }} <v-icon>{{ item.icon }}</v-icon></v-tab
      >
    </v-tabs>
    <v-divider class="mb-6"></v-divider>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in filteredTabs" :key="item.tab">
        <component
          :is="item.content"
          class="mt-7"
          @decrementContact="$emit('decrementContact')"
          :isSelfProfile="isSelfProfile"
          :showCreateProfile="item.name !== 'favorites'"
          :posts="posts"
          :userInfo="userData"
          :isLoguedUserProfile="isSelfProfile"
        >
        </component>
        <infinite-loading
          v-if="enableInfiniteScroll && item.name === 'posts'"
          spinner="spiral"
          @infinite="loadMore"
        ></infinite-loading>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import Vue, { Component } from "vue";
import PostContainer from "@/components/Post/PostContainer.vue";
import MyNetworkTab from "@/components/Profile/Tabs/MyNetworkTab.vue";
import TagsTab from "@/components/Profile/Tabs/TagsTab.vue";
import FavoritesTab from "@/components/Profile/Tabs/FavoritesTab.vue";
import DataTab from "@/components/Profile/Tabs/DataTab.vue";
import { i18n } from "@/main";
import { GetPost } from "@/models/post";
import { getUserPost } from "@/services/post";
import InfiniteLoading from "vue-infinite-loading";
import { Profile } from "@/models/profile";
import { getUserByCanonicalName } from "@/services/user";

type TabsTitles = {
  name?: string;
  tab: string;
  content: Component;
  icon: string;
};

export default Vue.extend({
  name: "ProfileTabs",

  props: { isSelfProfile: Boolean, loading: Boolean },

  components: {
    PostContainer,
    MyNetworkTab,
    TagsTab,
    FavoritesTab,
    DataTab,
    InfiniteLoading
  },

  data: () => ({
    userData: {} as Profile,
    posts: [] as GetPost[],
    currentPage: 0,
    enableInfiniteScroll: false,
    tab: null,
    items: [
      {
        name: "posts",
        tab: i18n.t("ViewProfile.Posts").toString(),
        content: PostContainer,
        icon: "mdi-code-tags"
      },
      {
        name: "network",
        tab: i18n.t("ViewProfile.MyNetwork").toString(),
        content: MyNetworkTab,
        icon: "mdi-account-multiple"
      },
      {
        name: "favorites",
        tab: i18n.t("ViewProfile.Favorites").toString(),
        content: FavoritesTab,
        icon: "mdi-bookmark"
      },
      { tab: i18n.t("ViewProfile.Data").toString(), content: DataTab, icon: "mdi-account-box" },
      { tab: i18n.t("ViewProfile.Tags").toString(), content: TagsTab, icon: "mdi-pound" }
    ] as TabsTitles[]
  }),

  computed: {
    filteredTabs(): TabsTitles[] {
      if (!this.isSelfProfile) {
        return this.items.filter((item) => {
          return item.name !== "network" && item.name !== "favorites";
        });
      } else {
        return this.items;
      }
    }
  },

  methods: {
    async fetchPosts() {
      const result = await getUserPost(this.userData.canonicalName, this.currentPage, 5);
      this.currentPage++;
      this.posts = result.content;
      if (result.totalElements !== 0) {
        this.enableInfiniteScroll = true;
      }
    },

    async loadMore($state: { loaded: () => void; complete: () => void }) {
      setTimeout(async () => {
        const result = await getUserPost(this.userData.canonicalName, this.currentPage, 5);
        if (result.content.length) {
          this.currentPage += 1;
          this.posts = this.posts.concat(result.content);
          $state.loaded();
        } else {
          $state.complete();
        }
      }, 1250);
    }
  },

  async created() {
    this.userData = await getUserByCanonicalName(this.$route.params.user);
    await this.fetchPosts();
  }
});
</script>

<style scoped>
.tab-container {
  border-top: 3px solid var(--v-primary-base) !important;
}
</style>
