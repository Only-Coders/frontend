<template>
  <v-dialog :value="value" @input="close" width="auto" transition="dialog-top-transition" max-width="650">
    <v-toolbar color="primary" dark>
      <h2 class="ml-4">{{ $i18n.t("deleteContact") }}</h2>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 mt-1" icon @click="close">
        <v-icon size="27"> mdi-close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="px-6 pt-8">
      <v-card-text>
        <h4 v-if="isFollow">
          {{ $i18n.t("areYouSureUnfollowUser") }}
          <span class="font-weight-black user_name">{{ firstName }} {{ lastName }}</span>
        </h4>

        <h4 v-else>
          {{ $i18n.t("areYouSureDeleteContact") }}
          <span class="font-weight-black user_name">{{ firstName }} {{ lastName }}</span>
          {{ $i18n.t("fromYourContacts") }}
        </h4>
      </v-card-text>

      <v-card-actions class="mt-8">
        <v-spacer></v-spacer>

        <v-btn color="error" text @click="close"> {{ $i18n.t("cancel") }} </v-btn>

        <v-btn color="primary" text class="ml-6" @click="deleteFromNetwork"> {{ $i18n.t("delete") }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DeleteContactDialog",

  props: { value: Boolean, firstName: String, lastName: String, isFollow: Boolean },

  data: () => ({}),

  methods: {
    close() {
      this.$emit("input");
    },
    deleteFromNetwork() {
      this.$emit("deleteFromNetwork");
      this.close();
    }
  }
});
</script>

<style scoped>
.user_name {
  font-size: 1.2em;
}
</style>
