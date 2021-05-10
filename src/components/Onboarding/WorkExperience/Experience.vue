<template>
  <v-card class="mb-8">
    <v-row no-gutters align="center">
      <v-col no-gutters>
        <v-card-title>{{ company }}</v-card-title>
        <v-card-text class="pb-2">{{ position }}</v-card-text>
        <v-card-text class="pt-0">{{ startDate }} - {{ endDate }}</v-card-text>
      </v-col>
      <v-col cols="2" class="mr-6" no-gutters>
        <v-btn block color="error" small outlined>{{ $i18n.t("Onboarding.Shared.deleteButtonLabel") }}</v-btn>
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
      :selectedExperience="{ company: company, position: position, startDate: startDate, endDate: endDate }"
    ></update-experience>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import UpdateExperience from "@/components/Onboarding/WorkExperience/UpdateExperience.vue";

export default Vue.extend({
  name: "Experience",

  components: { UpdateExperience },

  props: {
    company: String,
    position: String,
    startDate: String,
    endDate: String
  },

  methods: {
    showUpdateDialog() {
      console.log(this.startDate);
      this.updateDialog = !this.updateDialog;
    }
  },

  data: () => ({
    updateDialog: false,
    selectedExperience: {}
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
</style>
