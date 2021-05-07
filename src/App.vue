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
