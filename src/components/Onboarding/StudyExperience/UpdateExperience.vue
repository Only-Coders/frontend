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
      <v-card-text class="pt-16">
        <v-form ref="update-experience" lazy-validation>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-combobox
                v-model="experience.name"
                auto-select-first
                :loading="isLoading"
                :search-input.sync="search"
                :items="institutions"
                item-value="name"
                item-text="name"
                hide-no-data
                hide-details
                v-bind="{ ...inputProps }"
                :label="$i18n.t('Onboarding.StudyExperience.institutionLabel')"
                :rules="[rules.required]"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="experience.degree"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.StudyExperience.degreeLabel')"
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
                    :value="formatDate(experience.since)"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.StudyExperience.startDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="experience.since" @input="showStartDatePicker = false"></v-date-picker>
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
                    :value="formatDate(experience.until)"
                    :label="$i18n.t('Onboarding.StudyExperience.endDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="experience.until" @input="showEndDatePicker = false"></v-date-picker>
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
import RuleMixin from "@/mixins/rules";
import { StudyExperience } from "@/models/experience";
import { dateMixin } from "@/mixins/formattedDate";
import { inputMixin } from "@/mixins/inputProps";
import { Institution } from "@/models/institution";
import { getInstitutes } from "@/services/studyExperience";

export default Vue.extend({
  name: "UpdateStudyExperience",

  mixins: [RuleMixin, inputMixin, dateMixin],

  components: {},

  props: { value: Boolean, selectedExperience: Object as PropType<StudyExperience> },

  created() {
    this.experience = this.selectedExperience;
  },

  data: () => ({
    experience: {} as StudyExperience,
    showStartDatePicker: false,
    showEndDatePicker: false,
    search: "",
    isLoading: false,
    institutions: [] as Institution[],
    timer: 0
  }),

  methods: {
    emitUpdateExperience() {
      if ((this.$refs["update-experience"] as HTMLFormElement).validate()) {
        const institution: StudyExperience = {
          name: this.institutions.length === 0 ? this.search : this.institutions[0].name,
          degree: this.experience.degree,
          since: this.experience.since,
          until: this.experience.until
        };
        if (this.institutions.length !== 0) institution.id = this.institutions[0].id;
        this.$emit("updateExperienceData", institution);

        this.close();
      }
    },
    close() {
      this.$emit("input");
    }
  },

  watch: {
    search() {
      if (this.search) {
        this.isLoading = true;
        if (this.timer != 0) {
          clearTimeout(this.timer);
        }

        this.timer = setTimeout(async () => {
          try {
            const result = await getInstitutes(this.search);

            this.institutions = result.content;
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.isLoading = false;
          }
        }, 200);
      }
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
