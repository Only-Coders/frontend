<template>
  <v-card-title>
    <v-avatar>
      <v-img
        v-if="selectedChat"
        :src="
          canonicalName == selectedChat.toCanonicalName
            ? selectedChat.fromImageURI
            : selectedChat.toImageURI
            ? selectedChat.toImageURI
            : require('@/assets/images/default-avatar.png')
        "
      ></v-img>
    </v-avatar>
    <p class="mb-0 pl-3" v-if="selectedChat">
      {{ canonicalName == selectedChat.toCanonicalName ? selectedChat.from : selectedChat.to }}
    </p>
  </v-card-title>
</template>

<script lang="ts">
import Vue from "vue";
import { ChatType } from "@/store/modules/chat";

export default Vue.extend({
  name: "ChatHeader",

  computed: {
    selectedChat(): ChatType | null {
      return this.$store.state.chatModule.selectedChat;
    },
    canonicalName(): string {
      return this.$store.state.userModule.user.canonicalName;
    }
  }
});
</script>

<style scoped></style>
