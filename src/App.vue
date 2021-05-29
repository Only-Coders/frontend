<template>
  <v-app>
    <notifications group="feedback" />
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

/* TRANSITIONS */

/* NOTIFICATIONS */

.notifications {
  top: 0px !important;
  width: 310px !important;
  right: 10px !important;
}

.notification-wrapper {
  margin: 10px 0 !important;
  height: auto !important;
  border-radius: 8px !important;
  opacity: 1 !important;
}

.vue-notification {
  font-size: 14px !important;
  margin: -0px 0px 0px 0px !important;
  margin-right: 0px !important;
  cursor: pointer !important;
  height: 100% !important;
}

.vue-notification-group {
  top: 10px !important;
  right: 10px !important;
}

.vue-notification-wrapper {
  border-radius: 8px !important;
  margin-bottom: 5px !important;
}

.vue-notification-template.vue-notification.warning {
  background-color: #ffbc00 !important;
  border-left: 6px solid #ffd150 !important;
}

.vue-notification-template.vue-notification.error {
  border-left-color: #b82e24 !important;
  border-left: 6px solid #ff8484 !important;
}

.vue-notification-template.vue-notification.info {
  background: #1fa9d8 !important;
  border-left: 6px solid #87d1ea !important;
}

.vue-notification-template.vue-notification.success {
  border-left: 6px solid #648b5b !important;
  background-color: #73b176 !important;
}

.vue-notification .notification-title {
  font-size: 1.2rem;
  font-weight: 100;
}
</style>
