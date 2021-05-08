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
html {
  overflow: auto !important;
}

.v-text-field {
  border-radius: 4px !important;
}

.v-input__slot {
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
