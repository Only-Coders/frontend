<template>
  <div>
    <v-row class="py-10 px-16 mt-9" align="center" no-gutters>
      <span class="pl-10 pr-6">
        <v-icon size="30"> mdi-briefcase </v-icon>
      </span>
      <h3>FORMACIÓN ACADÉMICA</h3>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <v-row no-gutters class="px-16 ml-10 mb-6" v-for="(study, index) in studies" :key="index">
      <v-col cols="1" class="px-12 pt-0 mt-0 d-flex justify-center"
        ><v-icon size="30" class="school-icon"> mdi-school </v-icon></v-col
      >
      <v-col cols="1" class="pr-0 pa-0 mr-6">
        <p class="text-caption ma-0">
          {{ formatDateMMYY(study.since) }}
        </p>
        <p class="text-caption">
          {{ study.until ? formatDateMMYY(study.until) : "Actualidad" }}
        </p>
      </v-col>

      <v-col cols="7" class="pl-1">
        <h5>{{ study.institute.name }}</h5>
        <p class="text-caption">{{ study.degree }}</p>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getStudiesOfUser } from "@/services/studyExperience";
import { UserStudyExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";

export default Vue.extend({
  name: "StudyExperienceProfile",

  mixins: [dateMixin],

  data: () => ({
    studies: [] as UserStudyExperience[]
  }),

  async created() {
    const result = await getStudiesOfUser(this.$route.params.user, 0);
    this.studies = result.content;
    this.studies.push(result.content[0]);
    this.studies.push(result.content[0]);
    this.studies.push(result.content[0]);
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
.timeline-container {
  min-width: 300px;
}
.school-icon {
  align-self: baseline;
}
</style>
