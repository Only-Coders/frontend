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
        <v-form ref="update-experience" lazy-validation>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-text-field
                v-model="experience.organization"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.WorkExperience.organizationLabel')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="experience.position"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.WorkExperience.positionLabel')"
                v-bind="{ ...inputProps }"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-menu
                v-model="showStartDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatDate(experience.startDate)"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.WorkExperience.startDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  no-title
                  v-model="experience.startDate"
                  @input="showStartDatePicker = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6">
              <v-menu
                v-model="showEndDatePicker"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                left
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    :value="formatDate(experience.endDate)"
                    :label="$i18n.t('Onboarding.WorkExperience.endDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="experience.endDate" @input="showEndDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions style="height: 100px">
        <v-row justify="end">
          <v-col cols="3">
            <v-btn block color="primary" medium @click.prevent="emitUpdateExperience">{{
              $i18n.t("Onboarding.Shared.editButtonLabel")
            }}</v-btn>
          </v-col>
        </v-row>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { RuleMixin } from "@/mixins/rules";
import { WorkExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";
import { inputMixin } from "@/mixins/inputProps";

export default Vue.extend({
  name: "UpdateExperience",

  mixins: [RuleMixin, inputMixin, dateMixin],

  components: {},

  props: { value: Boolean, selectedExperience: Object as PropType<WorkExperience> },

  created() {
    this.experience = this.selectedExperience;
  },

  data: () => ({
    experience: {} as WorkExperience,
    showStartDatePicker: false,
    showEndDatePicker: false
  }),

  methods: {
    emitUpdateExperience() {
      if ((this.$refs["update-experience"] as HTMLFormElement).validate()) {
        this.$emit("passExperienceData", {
          organization: this.experience.organization,
          position: this.experience.position,
          startDate: this.experience.startDate,
          endDate: this.experience.endDate
        });
        this.close();
      }
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

.work-experience__add-text {
  color: #858585;
}
</style>
