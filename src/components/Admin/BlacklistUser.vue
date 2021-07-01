<template>
  <v-card class="py-1">
    <v-row align="center" no-gutters class="mt-3 mb-2">
      <v-avatar size="70" class="ml-4">
        <v-img
          class="user__profile-image"
          alt="user"
          :src="data.imageURI ? data.imageURI : require('@/assets/images/default-avatar.png')"
        />
      </v-avatar>
      <v-col class="align-start mr-8 pl-4" cols="9" sm="5">
        <v-row class="align-center justify-space-between" no-gutters>
          <div class="d-flex align-start">
            <v-col cols="auto" class="pa-0">
              <div style="user__name">
                <v-card-title class="pa-0 justify-center"
                  ><h4>{{ data.email }}</h4></v-card-title
                >
                <v-card-text class="pa-0 mt-3 text-center"> User creation: {{ blockedDate }} </v-card-text>
              </div>
            </v-col>
          </div>
        </v-row>
      </v-col>
      <v-col cols="3" sm="4" class="mt-sm-0 mt-4 ml-8 d-flex justify-end">
        <v-btn class="mt-4" height="35" width="50%" color="#ee5e5e" depressed dark small @click="deleteFromBlacklist">
          Unblock
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { BlacklistUser } from "@/models/blacklistUser";

export default Vue.extend({
  name: "BlacklistUser",

  props: {
    data: Object as PropType<BlacklistUser>
  },

  data: () => ({
    blockedDate: ""
  }),

  methods: {
    deleteFromBlacklist() {
      this.$emit("deleteFromBlacklist");
    },
    formatedUserDate() {
      let date = new Date(this.data.createdAt);
      this.blockedDate =
        date.getUTCDate().toString() + "/" + date.getUTCMonth().toString() + "/" + date.getUTCMonth().toString();
    }
  },

  created() {
    this.formatedUserDate();
  }
});
</script>

<style scoped></style>
