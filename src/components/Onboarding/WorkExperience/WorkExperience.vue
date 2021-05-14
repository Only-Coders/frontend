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

    <v-row v-if="experience.length" justify="center" no-gutters>
      <v-col
        cols="10"
        sm="8"
        md="6"
        lg="4"
        class="pt-12 overflow-y-auto"
        :style="$vuetify.breakpoint.xs ? 'max-height: 240px' : 'max-height: 500px'"
      >
        <div v-for="(exp, index) in experience" :key="index">
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
import NoData from "@/components/NoData.vue";

type UpdatedExperience = {
  updatedExperience: WorkExperience;
  updatedExperienceIndex: number;
};

type DeleteExperience = {
  updatedExperienceIndex: number;
};

export default Vue.extend({
  name: "WorkExperience",

  components: { Experience, AddExperience, NoData },

  props: { stepAction: Number },

  methods: {
    showAddDialog() {
      this.addDialog = !this.addDialog;
    },
    handleAddExperience(data: WorkExperience) {
      this.experience.push(data);
    },
    handleUpdateExperience(updatedData: UpdatedExperience) {
      this.experience[updatedData.updatedExperienceIndex] = updatedData.updatedExperience;
    },
    handleDeleteExperience(deleteIndex: DeleteExperience) {
      this.experience.splice(deleteIndex.updatedExperienceIndex, 1);
    }
  },

  data: () => ({
    experience: [] as WorkExperience[],
    addDialog: false,
    selectedUpdateIndex: 0
  }),

  watch: {
    stepAction() {
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

.work-experience__add-text {
  color: #858585;
}
</style>
