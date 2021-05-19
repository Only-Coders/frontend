<template>
  <v-card class="py-1">
    <v-row align="center" no-gutters>
      <v-col cols="2">
        <v-avatar size="70">
          <img alt="user" :src="imageURI" />
        </v-avatar>
      </v-col>

      <v-col class="align-start" cols="6">
        <v-card-title class="pb-1 pl-0"> {{ firstName }} {{ lastName }} </v-card-title>
        <v-card-text class="text-start pl-0"> La descripcion de la persona </v-card-text>
      </v-col>

      <v-col cols="4" class="d-flex">
        <v-btn color="primary" width="35%" class="mx-3" small @click="followUser" outlined>{{
          $i18n.t("Onboarding.SuggestedContacts.follow")
        }}</v-btn>

        <v-btn color="primary" width="35%" class="mx-3" small @click="sendContactRequest">{{
          $i18n.t("Onboarding.SuggestedContacts.add")
        }}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { post } from "@/services/contact";
import { post_follow } from "@/services/follow";

export default Vue.extend({
  name: "Contact",

  props: { firstName: String, lastName: String, imageURI: String, canonicalName: String },

  methods: {
    followUser() {
      post_follow(this.canonicalName);
    },
    sendContactRequest() {
      post({ canonicalName: this.canonicalName });
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
