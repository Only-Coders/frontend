<template>
  <v-row no-gutters justify="center" class="my-12">
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
import ChatMessages from "@/components/Chat/ChatMessages/ChatMessages.vue";

export default Vue.extend({
  name: "Chat",

  components: {
    ChatList,
    ChatMessages
  }
});
</script>

<style scoped>
.full-height {
  height: 100%;
}
</style>
