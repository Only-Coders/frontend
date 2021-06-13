<template>
  <transition name="scale-transition" mode="out-in">
    <v-sheet color="grey lighten-4" v-if="isLoading">
      <v-skeleton-loader class="mx-auto" max-width="400" type="list-item-avatar-three-line"></v-skeleton-loader>
    </v-sheet>
    <v-card v-else :style="`border-top: 4px solid ${color}`">
      <v-card-title>{{ message }}</v-card-title>
      <v-card-text class="d-flex">
        <v-icon size="52" :color="color">{{ icon }}</v-icon>
        <p class="text-h3 mb-0 pl-5">{{ quantity }}</p>
      </v-card-text>
    </v-card>
  </transition>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DashCard",

  props: {
    color: String,
    icon: String,
    quantity: Number,
    message: String,
    isLoading: Boolean
  }
});
</script>

<style scoped></style>
