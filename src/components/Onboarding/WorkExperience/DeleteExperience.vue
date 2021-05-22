<template>
  <v-dialog
    v-if="value"
    :value="value"
    @input="close"
    width="auto"
    max-width="670"
    overlay-opacity="0.8"
    overlay-color="#bbbbbb"
  >
    <v-card class="px-6 pt-2">
      <v-card-title>
        <span class="text-center headline mx-auto">{{
          $i18n.t("Onboarding.WorkExperience.deleteExperienceTitleDialog")
        }}</span>
      </v-card-title>
      <v-card-text class="pt-10">
        {{ $i18n.t("Onboarding.WorkExperience.deleteExperienceTextDialog1") }}
        <span class="font-weight-bold">{{ $props.selectedExperienceName }}</span>
        {{ $i18n.t("Onboarding.WorkExperience.deleteExperienceTextDialog2") }}
      </v-card-text>
      <v-card-actions style="height: 100px">
        <v-row justify="end">
          <v-col cols="3">
            <v-btn block color="error" medium @click.prevent="emitDeleteExperience">{{
              $i18n.t("Onboarding.Shared.deleteButtonLabel")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import RuleMixin from "@/mixins/rules";
import { WorkExperience } from "@/models/experience";

export default Vue.extend({
  name: "UpdateExperience",

  mixins: [RuleMixin],

  components: {},

  props: { value: Boolean, selectedExperienceName: String },

  methods: {
    emitDeleteExperience() {
      this.$emit("deleteExperienceData");
      this.close();
    },
    close() {
      this.$emit("input");
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
