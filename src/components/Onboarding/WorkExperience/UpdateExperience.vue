<template>
  <v-dialog
    v-if="value"
    :value="value"
    @input="close"
    width="auto"
    max-width="650"
    overlay-opacity="0.8"
    overlay-color="#bbbbbb"
  >
    <v-card class="px-6 pt-2">
      <v-card-title>
        <span class="headline mx-auto">{{ $i18n.t("Onboarding.WorkExperience.addExperienceTitleDialog") }}</span>
      </v-card-title>
      <v-card-text class="pt-10">
        <form ref="update-experience" lazy-validation>
          <v-row>
            <v-col cols="6">
              <v-text-field
                v-model="company"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.WorkExperience.companyLabel')"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                v-model="position"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.WorkExperience.positionLabel')"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="showStartDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.WorkExperience.startDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="startDate" @input="showStartDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="showEndDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="endDate"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.WorkExperience.endDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="endDate" @input="showEndDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
      <v-card-actions style="height: 100px">
        <v-row justify="end">
          <v-col cols="3">
            <v-btn block color="primary" medium @click.prevent="emitAddExperience">{{
              $i18n.t("Onboarding.Shared.editButtonLabel")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";
import { RuleMixin } from "@/mixins/rules";

export default Vue.extend({
  name: "UpdateExperience",

  mixins: [RuleMixin],

  components: {},

  props: { value: Boolean, selectedExperience: Object },

  methods: {
    formatDate(date: any) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${day}-${month}-${year}`;
    },
    emitAddExperience() {
      this.$emit("passExperienceData", {
        company: this.company,
        position: this.position,
        startDate: this.formatDate(this.startDate),
        endDate: this.formatDate(this.endDate)
      });
      this.close();
    },
    close() {
      this.$emit("input");
    }
  },
  data: () => ({
    company: "",
    position: "",
    startDate: "",
    startDateWithFormat: "",
    endDate: "",
    showStartDatePicker: false,
    showEndDatePicker: false
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
