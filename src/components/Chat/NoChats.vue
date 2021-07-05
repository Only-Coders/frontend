<template>
  <v-row no-gutters justify="center">
    <v-col cols="6">
      <v-img src="@/assets/images/no_data.svg" width="150" alt="no data"></v-img>
    </v-col>
    <v-col cols="12" class="text-center mt-5">
      <span>{{ $i18n.t("Chat.noChats") }}</span>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NoChats"
});
</script>

<style scoped></style>
