<template>
  <v-dialog :value="value" @input="close" width="auto" transition="dialog-top-transition" max-width="650">
    <v-toolbar color="primary" dark>
      <h2 class="ml-4">{{ $i18n.t("Settings.deleteAccount") }}</h2>
      <v-spacer></v-spacer>
      <v-btn class="mr-2 mt-1" icon @click="close">
        <v-icon size="27"> mdi-close </v-icon>
      </v-btn>
    </v-toolbar>

    <v-card class="px-6 pt-8">
      <v-card-text>
        <h4>
          {{ $i18n.t("Settings.areYouSureDeleteAccount") }}
        </h4>
      </v-card-text>

      <v-card-actions class="mt-8 pb-6">
        <v-spacer></v-spacer>

        <v-btn color="error" text @click="close"> {{ $i18n.t("cancel") }} </v-btn>

        <v-btn color="error" class="ml-6" @click="eliminateAccount" :loading="isLoading">
          {{ $i18n.t("delete") }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { eliminateAccount } from "@/services/account";

export default Vue.extend({
  name: "DeleteAccountDialog",

  props: { value: Boolean },

  data: () => ({ isLoading: false }),

  methods: {
    close() {
      this.$emit("input");
    },
    async eliminateAccount() {
      this.isLoading = true;
      const result = await eliminateAccount();
      if (result) {
        this.$store.commit("userModule/SET_USER_ELIMINATION_DATE", result.eliminationDate);
      }
      this.isLoading = false;
      this.close();
    }
  }
});
</script>

<style scoped></style>
