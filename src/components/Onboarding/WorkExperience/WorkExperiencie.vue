<template>
  <div style="position: relative; padding-top: 45px; height: 765px">
    <v-row justify="center" align="center" no-gutters>
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.WorkExperience.title") }}</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters>
      <v-col align="center" cols="6">
        <p>
          {{ $i18n.t("Onboarding.WorkExperience.text") }}
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" no-gutters class="pt-12">
      <v-col cols="4">
        <div v-if="experience.length">
          <div v-for="(exp, index) in experience" :key="index">
            <experience
              :company="exp.company"
              :position="exp.position"
              :startDate="exp.startDate"
              :endDate="exp.endDate"
            ></experience>
          </div>
        </div>
        <no-data v-else></no-data>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters class="pt-6">
      <v-col cols="1">
        <v-btn text @click="showAddDialog">
          <v-icon left dark> mdi-plus-circle-outline </v-icon>
          {{ $i18n.t("Onboarding.WorkExperience.addExperienceButton") }}
        </v-btn>
      </v-col>
    </v-row>
    <add-experience v-if="addDialog" v-model="addDialog" @passExperienceData="handleAddExperience"></add-experience>
    <img src="@/assets/images/Onboarding/undraw_Designer.svg" alt="online_resume" class="online_resume" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Experience from "@/components/Onboarding/WorkExperience/Experience.vue";
import { WorkExperience } from "@/models/experience";
import AddExperience from "@/components/Onboarding/WorkExperience/AddExperience.vue";
import NoData from "@/components/NoData.vue";

export default Vue.extend({
  name: "GeneralInformation",

  components: { Experience, AddExperience, NoData },

  props: {},

  methods: {
    showAddDialog() {
      this.addDialog = !this.addDialog;
    },
    handleAddExperience(data: WorkExperience) {
      this.experience.push(data);
    }
  },

  data: () => ({
    experience: [] as WorkExperience[],
    addDialog: false
  })
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

.work-experience__add-text {
  color: #858585;
}
</style>
