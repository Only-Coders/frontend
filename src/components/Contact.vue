<template>
  <v-row no-gutters align="center" justify="center" class="mb-2">
    <v-col sm="9" md="6" lg="5" class="my-0">
      <v-card class="py-1">
        <v-row align="center" no-gutters>
          <v-col cols="2">
            <v-avatar size="70">
              <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg" />
            </v-avatar>
          </v-col>

          <v-col class="align-start" cols="6">
            <v-card-title class="pb-1 pl-0"> {{ contactName }} {{ contactLastName }} </v-card-title>
            <v-card-text class="text-start pl-0"> La descripcion de la persona </v-card-text>
          </v-col>

          <v-col cols="4" class="d-flex">
            <v-btn color="primary" width="35%" class="mx-3" small @click="followTag" outlined>{{
              $i18n.t("Onboarding.SuggestedContacts.follow")
            }}</v-btn>

            <v-btn color="primary" width="35%" class="mx-3" small @click="followTag">{{
              $i18n.t("Onboarding.SuggestedContacts.add")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Contact",

  props: { contactName: String, contactLastName: String },

  methods: {
    //followTag() {}
  }
});
</script>

<style scoped>
.v-card.v-sheet.theme--light {
  background-color: #ffffff !important;
  border-left: 5px solid var(--v-secondary-base) !important;
}
</style>
