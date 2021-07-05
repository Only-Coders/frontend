<template>
  <v-card class="py-1">
    <v-row align="center" justify="space-around" no-gutters class="my-2">
      <v-avatar size="70" class="ml-6">
        <v-img alt="user" :src="data.imageURI ? data.imageURI : require('@/assets/images/default-avatar.png')" />
      </v-avatar>
      <v-col class="mr-8" cols="9" sm="5">
        <v-row class="justify-space-between" no-gutters>
          <v-col cols="auto" class="pa-0">
            <v-card-title class="pa-0 justify-center"
              ><h4>{{ data.email }}</h4></v-card-title
            >
            <v-card-text class="pa-0"> {{ $i18n.t("userBannDate") }} {{ blockedDate }} </v-card-text>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="3" sm="4" class="mt-sm-0 mt-4 ml-8 d-flex justify-end">
        <v-btn class="mt-4 mr-8" height="35" color="#ee5e5e" depressed dark small @click="deleteFromBlacklist">
          {{ $i18n.t("remove") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BlacklistUser } from "@/models/blacklistUser";
import { deleteBlacklistUser } from "@/services/blacklist";

export default Vue.extend({
  name: "BlacklistUser",

  props: {
    data: Object as PropType<BlacklistUser>
  },

  data: () => ({
    blockedDate: ""
  }),

  methods: {
    async deleteFromBlacklist() {
      await deleteBlacklistUser(this.data.email);
      this.$emit("deleteFromBlacklist", this.data.email);
    },
    formatedUserDate() {
      let date = new Date(this.data.createdAt);
      this.blockedDate = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    }
  },

  created() {
    this.formatedUserDate();
  }
});
</script>

<style scoped></style>
