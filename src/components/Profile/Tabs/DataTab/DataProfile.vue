<template>
  <div>
    <v-row class="pb-3 px-16" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-card-account-details </v-icon>
      </span>
      <h3>DATOS PERSONALES</h3>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <v-row v-if="userInfo.description" no-gutters class="mt-4">
      <span class="pl-16 pr-7 ml-16">
        <v-icon size="28"> mdi-text-box </v-icon>
      </span>
      <p>{{ userInfo.description }}</p>
    </v-row>

    <v-row no-gutters class="mt-4">
      <span class="pl-16 pr-7 ml-16">
        <v-icon size="28"> mdi-account-circle </v-icon>
      </span>
      <p>{{ userInfo.firstName + " " + userInfo.lastName }}</p>
    </v-row>

    <v-row no-gutters class="mt-4">
      <span class="pl-16 pr-7 ml-16">
        <v-icon size="28"> mdi-email </v-icon>
      </span>
      <p>{{ userInfo.email }}</p>
    </v-row>

    <v-row no-gutters class="mt-4" v-if="userInfo.birthDate">
      <span class="pl-16 pr-7 ml-16">
        <v-icon size="28"> mdi-calendar-month </v-icon>
      </span>
      <p>{{ formatDate(userInfo.birthDate) }}</p>
    </v-row>

    <v-row no-gutters class="mt-4">
      <span class="pl-16 pr-7 ml-16">
        <v-icon size="28"> mdi-map-marker-radius </v-icon>
      </span>
      <p>{{ userInfo.country.name }}</p>
    </v-row>

    <v-row no-gutters class="mt-4" v-if="userInfo.gitProfile">
      <span class="pl-16 pr-7 ml-16">
        <v-img width="30" src="srcImageGit"> </v-img>
      </span>
      <p>GIT</p>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Profile } from "@/models/profile";
import { dateMixin } from "@/mixins/formattedDate";
import { format } from "date-fns";
import GitPlatform from "@/mixins/gitPlatforms";

export default Vue.extend({
  name: "DataProfile",

  mixins: [dateMixin, GitPlatform],

  props: { userInfo: Object as PropType<Profile>, isLoguedUserProfile: Boolean },

  data: () => ({
    birthDate: String,
    srcImageGit: String
  }) /* ,

  created() {
    this.birthDate = format(new Date(this.userInfo.birthDate), "dd/MM/yyyy").toString;
  } */
});
</script>

<style scoped>
.theme--light.v-divider {
  border-color: var(--v-secondary-base) !important;
}
.divider-container {
  width: 100%;
}
</style>
