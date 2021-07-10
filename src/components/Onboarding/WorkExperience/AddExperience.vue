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
        <v-form ref="add-experience" lazy-validation>
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-combobox
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
                v-model="position"
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
                    :value="formatDate(since)"
                    :rules="[rules.required]"
                    :label="$i18n.t('Onboarding.WorkExperience.startDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="{ attrs, ...inputProps }"
                    v-on="on"
                    readonly
                    hide-details
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="since" @input="showStartDatePicker = false"></v-date-picker>
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
                    :value="formatDate(until)"
                    :label="$i18n.t('Onboarding.WorkExperience.endDateLabel')"
                    append-icon="mdi-calendar-month-outline"
                    v-bind="{ attrs, ...inputProps }"
                    v-on="on"
                    hide-details
                    readonly
                  ></v-text-field>
                </template>
                <v-date-picker no-title v-model="until" @input="showEndDatePicker = false"></v-date-picker>
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
import Vue, { VueConstructor } from "vue";
import ruleMixin, { RuleMixin } from "@/mixins/rules";
import inputPropsMixin, { InputPropsMixin } from "@/mixins/inputProps";
import dateMixin, { DateMixin } from "@/mixins/formattedDate";
import { Organization } from "@/models/organization";
import { getOrganizations } from "@/services/workExperience";
import { WorkExperience } from "@/models/experience";

export default (Vue as VueConstructor<Vue & InputPropsMixin & DateMixin & RuleMixin>).extend({
  name: "AddWorkExperience",

  mixins: [ruleMixin, inputPropsMixin, dateMixin],

  components: {},

  props: { value: Boolean },

  data: () => ({
    position: "",
    since: "",
    until: "",
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
        const organization: WorkExperience = {
          name: this.organizations.length === 0 ? this.search : this.organizations[0].name,
          position: this.position,
          since: this.since,
          until: this.until
        };
        if (this.organizations.length !== 0) organization.id = this.organizations[0].id;

        this.$emit("passExperienceData", organization);
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
