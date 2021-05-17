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
        <span class="headline mx-auto">{{ $i18n.t("Onboarding.StudyExperience.addExperienceTitleDialog") }}</span>
      </v-card-title>
      <v-card-text class="pt-10">
        <v-form ref="add-experience" lazy-validation>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-autocomplete
                :loading="isLoading"
                :search-input.sync="search"
                :items="organizations"
                item-value="name"
                item-text="name"
                hide-no-data
                hide-details
                v-bind="{ ...inputProps }"
                :label="$i18n.t('Onboarding.StudyExperience.institutionLabel')"
                :rules="[rules.required]"
                @keydown.enter.prevent="addOrganization"
                @keypress="pepe"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="degree"
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
                    :value="formatDate(startDate)"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.StudyExperience.startDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="startDate" @input="showStartDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" x>
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
                    :value="formatDate(endDate)"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.WorkExperience.endDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="(attrs, { ...inputProps })"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="endDate" @input="showEndDatePicker = false"></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions style="height: 100px">
        <v-row justify="end">
          <v-col cols="3">
            <v-btn block color="primary" medium @click.prevent="emitAddExperience">{{
              $i18n.t("Onboarding.Shared.addButtonLabel")
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
import { inputMixin } from "@/mixins/inputProps";
import { dateMixin } from "@/mixins/formattedDate";
import { Organization } from "@/models/organization";
import { getOrganizations, postOrganization } from "@/services/workExperience";

export default Vue.extend({
  name: "AddStudyExperience",

  mixins: [RuleMixin, inputMixin, dateMixin],

  components: {},

  props: { value: Boolean },

  data: () => ({
    institution: "",
    degree: "",
    startDate: "",
    endDate: "",
    showStartDatePicker: false,
    showEndDatePicker: false,
    search: "",
    isLoading: false,
    organizations: [] as Organization[],
    timer: 0
  }),

  methods: {
    async emitAddExperience() {
      if ((this.$refs["add-experience"] as HTMLFormElement).validate()) {
        // pegarle a la api y agregar la organization si no existe
        this.$emit("passExperienceData", {
          organization: this.institution,
          position: this.degree,
          startDate: this.startDate,
          endDate: this.endDate
        });
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
        this.institution = this.search;
        this.isLoading = true;
        if (this.timer != 0) {
          clearTimeout(this.timer);
          this.isLoading = false;
        }

        this.timer = setTimeout(async () => {
          try {
            const result = await getOrganizations(this.search);

            this.organizations = result.content;
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.isLoading = false;
          }
        }, 2000);

        this.timer = 0;
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

.work-experience__add-text {
  color: #858585;
}
</style>
