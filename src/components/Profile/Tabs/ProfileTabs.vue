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

      <v-tab background-color="primary" v-for="item in items.filter((tab) => tab.visible)" :key="item.tab">
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
  name?: string;
  tab: string;
  content: Component;
  icon: string;
  visible: boolean;
};

export default Vue.extend({
  name: "ProfileTabs",

  props: { isSelfProfile: Boolean },

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
        icon: "mdi-code-tags",
        visible: true
      },
      {
        name: "contacts",
        tab: i18n.t("ViewProfile.Contacts").toString(),
        content: ContactsTab,
        icon: "mdi-account-multiple",
        visible: false
      },
      {
        name: "favorites",
        tab: i18n.t("ViewProfile.Favorites").toString(),
        content: FavoritesTab,
        icon: "mdi-bookmark",
        visible: false
      },
      { tab: i18n.t("ViewProfile.Data").toString(), content: DataTab, icon: "mdi-account-box", visible: true },
      { tab: i18n.t("ViewProfile.Tags").toString(), content: TagsTab, icon: "mdi-pound", visible: true }
    ] as TabsTitles[]
  }),

  created() {
    this.items.find((item) => {
      if (this.isSelfProfile && (item.name === "contacts" || item.name === "favorites")) {
        item.visible = true;
      }
    });
  }
});
</script>

<style scoped>
.tab-container {
  border-top: 3px solid var(--v-primary-base) !important;
}
</style>
