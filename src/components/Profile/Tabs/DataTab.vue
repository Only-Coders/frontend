<template>
  <div>
    <DataProfile :userInfo="userInfo" :isLoguedUserProfile="isLoguedUserProfile"></DataProfile>

    <WorkExperienceProfile></WorkExperienceProfile>

    <StudyExperienceProfile></StudyExperienceProfile>

    <v-row class="py-10 px-16" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-card-account-details </v-icon>
      </span>
      <h3>HABILIDADES</h3>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Profile } from "@/models/profile";
import { dateMixin } from "@/mixins/formattedDate";
import WorkExperienceProfile from "@/components/Profile/Tabs/DataTab/WorkExperienceProfile.vue";
import DataProfile from "@/components/Profile/Tabs/DataTab/DataProfile.vue";
import StudyExperienceProfile from "@/components/Profile/Tabs/DataTab/StudyExperienceProfile.vue";

export default Vue.extend({
  name: "DataTab",

  mixins: [dateMixin],

  components: { DataProfile, WorkExperienceProfile, StudyExperienceProfile },

  props: { userInfo: Object as PropType<Profile>, isLoguedUserProfile: Boolean },

  data: () => ({})
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
