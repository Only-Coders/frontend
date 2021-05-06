<template>
  <v-app>
    <app-layout></app-layout>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import AppLayout from "@/layouts/AppLayout.vue";

export default Vue.extend({
  name: "App",

  components: { AppLayout }
});
</script>

<style>
.v-text-field--rounded {
  border-radius: 8px !important;
}
</style>
