<template>
  <DownloadApk v-if="isOnMobile"></DownloadApk>
  <v-row v-else no-gutters justify="center" class="my-12">
    <v-col cols="3">
      <chat-list class="full-height"></chat-list>
    </v-col>
    <v-col cols="7">
      <chat-messages></chat-messages>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import ChatList from "@/components/Chat/ChatList.vue";
import DownloadApk from "@/components/Chat/DownloadApk.vue";
import ChatMessages from "@/components/Chat/ChatMessages/ChatMessages.vue";

export default Vue.extend({
  name: "Chat",

  components: {
    ChatList,
    ChatMessages,
    DownloadApk
  },

  computed: {
    isOnMobile: {
      get(): boolean {
        return this.$vuetify.breakpoint.xsOnly;
      }
    }
  }
});
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
