<template>
  <div>
    <v-row class="py-10 px-sm-16 px-5 mt-9" align="center" no-gutters>
      <span class="pl-4 pl-sm-10 pr-6">
        <v-icon size="30"> mdi-briefcase </v-icon>
      </span>
      <h3>{{ $i18n.t("ViewProfile.academicExperience") }}</h3>
      <v-spacer></v-spacer>
      <v-btn class="mr-6" fab small depressed color="transparent" v-if="isLoguedUserProfile">
        <v-icon size="28" color="grey darken-1"> mdi-plus </v-icon>
      </v-btn>
      <div class="divider-container mt-8">
        <v-divider></v-divider>
      </div>
    </v-row>

    <div v-if="studies.length > 0">
      <v-row no-gutters class="px-sm-16 ml-sm-10 mb-6" v-for="(study, index) in studies" :key="index">
        <v-col cols="1" class="px-12 pt-0 mt-0 d-flex justify-center"
          ><v-icon size="30" class="school-icon"> mdi-school </v-icon></v-col
        >
        <v-col cols="auto" class="mr-9 ma-0 pa-0 date_container">
          <p class="text-caption ma-0">
            {{ formatDateMMYY(study.since) }}
          </p>
          <p class="text-caption">
            {{ study.until ? formatDateMMYY(study.until) : $i18n.t("present") }}
          </p>
        </v-col>

        <v-col cols="auto">
          <h5>{{ study.institute.name }}</h5>
          <p class="text-caption">{{ study.degree }}</p>
        </v-col>
      </v-row>
    </div>

    <no-data v-else></no-data>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getStudiesOfUser } from "@/services/studyExperience";
import { UserStudyExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";
import NoData from "@/components/NoData.vue";

export default Vue.extend({
  name: "StudyExperienceProfile",

  mixins: [dateMixin],

  components: { NoData },

  props: { isLoguedUserProfile: Boolean },

  data: () => ({
    studies: [] as UserStudyExperience[]
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
.school-icon {
  align-self: baseline;
}
.date_container {
  min-width: 62px;
}
</style>
