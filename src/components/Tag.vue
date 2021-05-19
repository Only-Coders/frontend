<template>
  <v-card class="mb-8 py-1" max-height="96">
    <v-row no-gutters align="center">
      <v-col class="pl-6 align-start">
        <v-card-title class="pb-1"> {{ canonicalName }} </v-card-title>
        <v-card-text class="text-start">23 {{ $i18n.t("Onboarding.Tag.cardText") }}</v-card-text>
      </v-col>
      <v-col cols="2" class="mr-8" no-gutters>
        <v-btn block color="primary" small @click="followTag" outlined>{{ $i18n.t("Onboarding.Tag.follow") }}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { post } from "@/services/tag";

export default Vue.extend({
  name: "Tag",

  props: { canonicalName: String },

  methods: {
    followTag() {
      post(this.canonicalName);
    }
  }
});
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid var(--v-secondary-base) !important;
}
</style>
