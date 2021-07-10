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
                :items="organizations"
                item-value="name"
                item-text="name"
                hide-no-data
                hide-details
                v-bind="{ ...inputProps }"
                :label="$i18n.t('Onboarding.WorkExperience.organizationLabel')"
                :rules="[rules.required]"
                @focus="doSearch"
              ></v-combobox>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                v-model="experience.position"
                :rules="[rules.required]"
                :label="$i18n.t('Onboarding.WorkExperience.positionLabel')"
                v-bind="{ ...inputProps }"
                hide-details
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
                    :value="formattedDateSince"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.WorkExperience.startDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="{ attrs, ...inputProps }"
                    v-on="on"
                    readonly
                    hide-details
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
                    :value="formattedDateUntil"
                    :label="$i18n.t('Onboarding.WorkExperience.endDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="{ attrs, ...inputProps }"
                    v-on="on"
                    hide-details
                    readonly
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
import Vue, { PropType, VueConstructor } from "vue";
import ruleMixin, { RuleMixin } from "@/mixins/rules";
import { WorkExperience } from "@/models/experience";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import inputPropsMixin, { InputPropsMixin } from "@/mixins/inputProps";
import { Organization } from "@/models/organization";
import { getOrganizations } from "@/services/workExperience";

export default (Vue as VueConstructor<Vue & InputPropsMixin & DateMixin & RuleMixin>).extend({
  name: "UpdateWorkExperience",

  mixins: [ruleMixin, inputPropsMixin, dateMixin],

  components: {},

  props: { value: Boolean, selectedExperience: Object as PropType<WorkExperience> },

  created() {
    this.experience = this.selectedExperience;
  },

  data: () => ({
    experience: {} as WorkExperience,
    showStartDatePicker: false,
    showEndDatePicker: false,
    search: "",
    isLoading: false,
    organizations: [] as Organization[],
    timer: 0
  }),

  methods: {
    emitUpdateExperience() {
      if ((this.$refs["update-experience"] as HTMLFormElement).validate()) {
        const organization: WorkExperience = {
          name: this.organizations.length === 0 ? this.search : this.organizations[0].name,
          position: this.experience.position,
          since: this.experience.since,
          until: this.experience.until
        };
        if (this.organizations.length !== 0) organization.id = this.organizations[0].id;

        this.$emit("updateExperienceData", organization);

        this.close();
      }
    },
    close() {
      this.$emit("input");
    },
    async doSearch() {
      if (this.search == null) {
        this.organizations = (await getOrganizations("")).content;
      }
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
            const result = await getOrganizations(this.search);

            this.organizations = result.content;
          } catch (error) {
            clearTimeout(this.timer);
          } finally {
            this.isLoading = false;
          }
        }, 200);
      }
    }
  },

  computed: {
    formattedDateSince: {
      get(): string {
        if (this.experience.since) {
          return this.formatDate(new Date(this.experience.since).toISOString().substring(0, 10));
        } else {
          return "";
        }
      }
    },

    formattedDateUntil: {
      get(): string {
        if (this.experience.until) {
          return this.formatDate(new Date(this.experience.until).toISOString().substring(0, 10));
        } else {
          return "";
        }
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
