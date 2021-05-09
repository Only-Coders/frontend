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

    <v-row justify="center" no-gutters class="pt-16">
      <v-col cols="4">
        <experience :company="company" :position="position" :startDate="startDate" :endDate="endDate"></experience>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters>
      <v-col cols="1">
        <v-btn depressed plain tile @click="showAddDialog">
          <v-icon size="30px" color="#858585">mdi-plus-circle-outline</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="2">
        <h3 class="work-experience__add-text">{{ $i18n.t("Onboarding.WorkExperience.addExperienceButton") }}</h3>
      </v-col>
    </v-row>
    <add-experience v-if="addDialog" v-model="addDialog"></add-experience>
    <img src="@/assets/images/Onboarding/undraw_Designer.svg" alt="online_resume" class="online_resume" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Experience from "@/components/Onboarding/Experience.vue";
import { WorkExperience } from "@/models/experience";
import AddExperience from "@/components/Onboarding/AddExperience.vue";

export default Vue.extend({
  name: "GeneralInformation",

  components: { Experience, AddExperience },

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
    company: "Mercado Libre",
    position: "semi-junior full stack developer",
    startDate: "02/03/2019",
    endDate: "30/10/2021",
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
