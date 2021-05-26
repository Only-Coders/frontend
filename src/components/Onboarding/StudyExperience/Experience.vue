<template>
  <v-card class="mb-8">
    <v-row no-gutters align="center">
      <v-col no-gutters>
        <v-card-title class="pb-0 text-left">{{ studyExperience.name }}</v-card-title>
        <v-card-text class="pb-2 text-left">{{ studyExperience.degree }}</v-card-text>
        <v-card-text class="pt-0 text-left"
          >{{ formatDate(studyExperience.since) }}
          {{ $i18n.t("Onboarding.Shared.fromDateToAnother") }}
          {{
            studyExperience.until === ""
              ? $i18n.t("Onboarding.StudyExperience.currentLabel")
              : formatDate(studyExperience.until)
          }}
        </v-card-text>
      </v-col>
      <v-col cols="2" class="mr-6" no-gutters>
        <v-btn block color="error" small @click="showDeleteDialog" outlined>{{
          $i18n.t("Onboarding.Shared.deleteButtonLabel")
        }}</v-btn>
      </v-col>
      <v-col cols="2" class="mr-4" no-gutters>
        <v-btn block color="primary" small @click="showUpdateDialog" outlined>{{
          $i18n.t("Onboarding.Shared.editButtonLabel")
        }}</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";

import { StudyExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";

export default Vue.extend({
  name: "StudyExperienceItem",

  mixins: [dateMixin],

  components: {},

  props: {
    studyExperience: Object as PropType<StudyExperience>,
    selectedIndex: Number
  },

  data: () => ({
    selectedExperience: {} as StudyExperience
  }),

  methods: {
    showUpdateDialog() {
      this.$emit("passUpdatedExperienceData", {
        experience: { ...this.studyExperience },
        experienceIndex: this.selectedIndex
      });
    },
    showDeleteDialog() {
      this.$emit("passDeleteExperienceData", {
        experience: { ...this.studyExperience },
        experienceIndex: this.selectedIndex
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.online_resume {
  width: 260px;
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 100px;
}
</style>
