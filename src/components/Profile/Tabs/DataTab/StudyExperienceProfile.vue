<template>
  <div>
    <v-row class="py-10 px-sm-16 px-5 mt-9" align="center" no-gutters>
      <span class="pl-4 pl-sm-10 pr-6">
        <v-icon size="30"> mdi-school </v-icon>
      </span>
      <h3>{{ $i18n.t("ViewProfile.academicExperience") }}</h3>
      <v-spacer></v-spacer>
      <v-btn class="mr-6" fab small depressed color="transparent" v-if="isLoguedUserProfile">
        <v-icon size="28" color="grey darken-1" @click="addDialog = !addDialog"> mdi-plus </v-icon>
      </v-btn>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <div v-if="studies.length > 0">
      <v-row no-gutters v-for="(study, index) in studies" :key="index">
        <StudyExperienceItem :study="study"></StudyExperienceItem>
      </v-row>
    </div>

    <no-data v-else></no-data>

    <add-experience v-if="addDialog" v-model="addDialog"></add-experience>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getStudiesOfUser } from "@/services/studyExperience";
import { UserStudyExperience } from "@/models/experience";
import NoData from "@/components/NoData.vue";
import StudyExperienceItem from "@/components/Profile/Tabs/DataTab/StudyExperienceItem.vue";
import AddExperience from "@/components/Onboarding/StudyExperience/AddExperience.vue";

export default Vue.extend({
  name: "StudyExperienceProfile",

  components: { NoData, StudyExperienceItem, AddExperience },

  props: { isLoguedUserProfile: Boolean },

  data: () => ({
    studies: [] as UserStudyExperience[],
    addDialog: false
  }),

  async created() {
    const result = await getStudiesOfUser(this.$route.params.user, 0);
    this.studies = result.content;
  }
});
</script>

<style scoped>
.theme--light.v-divider {
  border-color: var(--v-secondary-base) !important;
}
.divider-container {
  width: 100%;
}
.date_container {
  min-width: 62px;
}
</style>
