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

      <v-tab background-color="primary" v-for="item in items" :key="item.tab">
        {{ item.tab }} <v-icon>{{ item.icon }}</v-icon></v-tab
      >
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="item in items" :key="item.tab">
        <component :is="item.content" class="mt-7"> </component>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script lang="ts">
import Vue, { Component } from "vue";
import PostContainer from "@/components/Post/PostContainer.vue";
import ContactsTab from "@/components/Profile/Tabs/ContactsTab.vue";
import TagsTab from "@/components/Profile/Tabs/TagsTab.vue";
import FavoritesTab from "@/components/Profile/Tabs/FavoritesTab.vue";
import DataTab from "@/components/Profile/Tabs/DataTab.vue";
import { i18n } from "@/main";

type TabsTitles = {
  tab: string;
  content: Component;
  icon: string;
};

export default Vue.extend({
  name: "ProfileTabs",

  components: {
    PostContainer,
    ContactsTab,
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
        tab: i18n.t("ViewProfile.Contacts").toString(),
        content: ContactsTab,
        icon: "mdi-account-multiple"
      },
      {
        tab: i18n.t("ViewProfile.Favorites").toString(),
        content: FavoritesTab,
        icon: "mdi-bookmark"
      },
      { tab: i18n.t("ViewProfile.Data").toString(), content: DataTab, icon: "mdi-account-box" },
      { tab: i18n.t("ViewProfile.Tags").toString(), content: TagsTab, icon: "mdi-pound" }
    ] as TabsTitles[]
  })
});
</script>

<style scoped>
.tab-container {
  background-color: #ffffff !important;
  border-top: 3px solid var(--v-primary-base) !important;
}
</style>
