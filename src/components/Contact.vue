<template>
  <v-card class="py-1">
    <v-btn class="btn_cross mr-2 mt-1" icon small @click="closeSuggestedContact">
      <v-icon size="20"> mdi-close </v-icon>
    </v-btn>
    <v-row align="center" no-gutters class="mt-3 mb-2">
      <v-col cols="3" sm="2">
        <v-avatar size="70">
          <v-img alt="user" :src="imageURI ? imageURI : require('@/assets/images/default-avatar.png')" />
        </v-avatar>
      </v-col>

      <v-col class="align-start mr-10 mt" cols="7" sm="5">
        <v-card-title class="pb-1 pl-0"> {{ firstName }} {{ lastName }} </v-card-title>
        <v-card-text class="text-start pl-0"> La descripcion de la persona </v-card-text>
      </v-col>

      <v-col cols="12" sm="4" class="mt-sm-0 mt-4">
        <v-btn color="primary" width="35%" class="mx-3" small @click="followUser" outlined>
          {{ $i18n.t("Onboarding.SuggestedContacts.follow") }}
        </v-btn>

        <v-btn color="primary" width="35%" class="mx-3" small @click="sendContactRequest">
          {{ $i18n.t("Onboarding.SuggestedContacts.add") }}
        </v-btn>
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
    },
    closeSuggestedContact() {
      this.$emit("remove");
    }
  }
});
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid var(--v-secondary-base) !important;
}

.btn_cross {
  position: absolute !important;
  right: 0;
  top: 0;
}
</style>
