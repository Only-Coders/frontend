<template>
  <v-card>
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
        >
        </component>
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

type TabsTitles = {
  name?: string;
  tab: string;
  content: Component;
  icon: string;
};

export default Vue.extend({
  name: "ProfileTabs",

  props: { isSelfProfile: Boolean },

  components: {
    PostContainer,
    MyNetworkTab,
    TagsTab,
    FavoritesTab,
    DataTab
  },

  data: () => ({
    tab: null,
    items: [
      {
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

  /* created() {
    if (!this.isSelfProfile) {
      this.items = this.items.filter((item) => {
        return item.name !== "network" && item.name !== "favorites";
      });
    }
  }, */

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
  }
});
</script>

<style scoped>
.tab-container {
  border-top: 3px solid var(--v-primary-base) !important;
}
</style>
