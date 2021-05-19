<template>
  <div style="position: relative; margin-top: 85px; height: 765px">
    <v-row justify="center" class="pt-sm-0 pt-16" align="center" no-gutters>
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

    <v-row v-if="experiences.length" justify="center" no-gutters>
      <v-col
        cols="10"
        sm="8"
        md="6"
        lg="4"
        class="pt-12 overflow-y-auto"
        :style="$vuetify.breakpoint.xs ? 'max-height: 290px' : 'max-height: 580px'"
      >
        <div v-for="(exp, index) in experiences" :key="index">
          <experience
            :workExperience="exp"
            :selectedIndex="index"
            @passUpdatedExperienceData="handleUpdateExperience"
            @passDeleteExperienceData="handleDeleteExperience"
          ></experience>
        </div>
      </v-col>
    </v-row>
    <v-row v-else class="pb-md-8 pb-lg-12 pb-8" justify="center" no-gutters>
      <v-col>
        <no-data></no-data>
      </v-col>
    </v-row>
    <v-row justify="center" no-gutters>
      <v-col cols="4" sm="3" md="2" lg="1">
        <v-btn text @click="showAddDialog">
          <v-icon left dark> mdi-plus-circle-outline </v-icon>
          {{ $i18n.t("Onboarding.WorkExperience.addExperienceButton") }}
        </v-btn>
      </v-col>
    </v-row>
    <add-experience v-if="addDialog" v-model="addDialog" @passExperienceData="handleAddExperience"></add-experience>
    <update-experience
      v-if="updateDialog"
      v-model="updateDialog"
      :selectedExperience="selectedWork"
      @updateExperienceData="updateExperience"
    ></update-experience>
    <delete-experience
      v-if="deleteDialog"
      v-model="deleteDialog"
      :selectedExperienceName="selectedWork.name"
      @deleteExperienceData="deleteExperience"
    ></delete-experience>
    <img
      class="online_resume hidden-md-and-down"
      src="@/assets/images/Onboarding/undraw_Designer.svg"
      alt="online_resume"
    />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Experience from "@/components/Onboarding/WorkExperience/Experience.vue";
import { WorkExperience } from "@/models/experience";
import AddExperience from "@/components/Onboarding/WorkExperience/AddExperience.vue";
import UpdateExperience from "@/components/Onboarding/WorkExperience/UpdateExperience.vue";
import DeleteExperience from "@/components/Onboarding/WorkExperience/DeleteExperience.vue";
import NoData from "@/components/NoData.vue";
import { postOrganization } from "@/services/workExperience";

type ExperienceAction = {
  experience: WorkExperience;
  experienceIndex: number;
};

export default Vue.extend({
  name: "WorkExperience",

  components: { Experience, AddExperience, UpdateExperience, DeleteExperience, NoData },

  props: { stepAction: Boolean },

  data: () => ({
    experiences: [] as WorkExperience[],
    addDialog: false,
    updateDialog: false,
    deleteDialog: false,
    selectedIndex: 0,
    selectedWork: {} as WorkExperience
  }),

  methods: {
    showAddDialog() {
      this.addDialog = !this.addDialog;
    },
    handleAddExperience(data: WorkExperience) {
      this.experiences.push(data);
    },
    handleUpdateExperience(updatedData: ExperienceAction) {
      this.selectedWork = updatedData.experience;
      this.selectedIndex = updatedData.experienceIndex;
      this.updateDialog = !this.updateDialog;
    },
    updateExperience(experience: WorkExperience) {
      this.experiences[this.selectedIndex] = experience;
    },
    handleDeleteExperience(deleteData: ExperienceAction) {
      this.selectedWork = deleteData.experience;
      this.selectedIndex = deleteData.experienceIndex;
      this.deleteDialog = !this.deleteDialog;
    },
    deleteExperience() {
      this.experiences.splice(this.selectedIndex, 1);
    }
  },

  watch: {
    async stepAction() {
      await Promise.all(
        this.experiences.map((experience) => {
          return postOrganization(experience);
        })
      );
      this.$emit("moveNextStep");
      this.$destroy();
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
