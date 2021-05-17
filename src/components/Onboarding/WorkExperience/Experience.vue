<template>
  <v-card class="mb-8">
    <v-row no-gutters align="center">
      <v-col no-gutters>
        <v-card-title class="pb-0 text-left">{{
          hasUpdatedExperience ? updatedExperience.organization : workExperience.name
        }}</v-card-title>
        <v-card-text class="pb-2 text-left">{{
          hasUpdatedExperience ? updatedExperience.position : workExperience.position
        }}</v-card-text>
        <v-card-text class="pt-0 text-left"
          >{{ hasUpdatedExperience ? formatDate(updatedExperience.since) : formatDate(workExperience.since) }}
          {{ $i18n.t("Onboarding.Shared.fromDateToAnother") }}
          {{
            hasUpdatedExperience ? formatDate(updatedExperience.until) : formatDate(workExperience.until)
          }}</v-card-text
        >
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
    <update-experience
      v-if="updateDialog"
      v-model="updateDialog"
      :selectedExperience="workExperience"
      @passExperienceData="handleUpdateExperience"
    ></update-experience>
    <delete-experience
      v-if="deleteDialog"
      v-model="deleteDialog"
      :selectedExperience="workExperience"
      @passExperienceData="handleDeleteExperience"
    ></delete-experience>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import UpdateExperience from "@/components/Onboarding/WorkExperience/UpdateExperience.vue";
import DeleteExperience from "@/components/Onboarding/WorkExperience/DeleteExperience.vue";
import { WorkExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";

export default Vue.extend({
  name: "Experience",

  mixins: [dateMixin],

  components: { UpdateExperience, DeleteExperience },

  props: {
    workExperience: Object as PropType<WorkExperience>,
    selectedIndex: Number
  },

  created() {
    console.log(this.workExperience);
  },

  data: () => ({
    updateDialog: false,
    deleteDialog: false,
    selectedExperience: {} as WorkExperience,
    hasUpdatedExperience: false,
    updatedExperience: {} as WorkExperience
  }),

  methods: {
    showUpdateDialog() {
      this.updateDialog = !this.updateDialog;
    },
    showDeleteDialog() {
      this.deleteDialog = !this.deleteDialog;
    },
    handleUpdateExperience(data: WorkExperience) {
      console.log(data);
      this.hasUpdatedExperience = true;
      this.updatedExperience = { ...data };
      this.$emit("passUpdatedExperienceData", {
        updatedExperience: this.updatedExperience,
        updatedExperienceIndex: this.selectedIndex
      });
    },
    handleDeleteExperience() {
      this.$emit("passDeleteExperienceData", {
        updatedExperienceIndex: this.selectedIndex
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
