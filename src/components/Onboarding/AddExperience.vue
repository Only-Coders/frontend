<template>
  <v-dialog
    v-if="value"
    :value="value"
    width="auto"
    max-width="650"
    overlay-opacity="0.8"
    overlay-color="white"
    @click:outside="!value"
  >
    <v-card class="px-6 pt-6">
      <v-card-title> Agregar experiencia laboral </v-card-title>
      <v-card-text class="pt-10">
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="company"
              :rules="emailRules"
              :label="$i18n.t('Onboarding.WorkExperience.companyLabel')"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="position"
              :rules="emailRules"
              :label="$i18n.t('Onboarding.WorkExperience.positionLabel')"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <v-text-field
              v-model="startDate"
              :rules="emailRules"
              :label="$i18n.t('Onboarding.WorkExperience.startDateLabel')"
              append-icon="mdi-calendar-month-outline"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="endDate"
              :rules="emailRules"
              :label="$i18n.t('Onboarding.WorkExperience.endDateLabel')"
              append-icon="mdi-calendar-month-outline"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-card-actions class="pt-6">
          <v-row justify="end">
            <v-col cols="2">
              <v-btn block color="primary" medium>{{ $i18n.t("Onboarding.Shared.addButtonLabel") }}</v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GeneralInformation",

  components: {},

  props: { value: Boolean },

  methods: {
    // emitAddExperience (event) {
    //   this.$emit('childToParent', this.childMessage)
    // }
  },

  data: () => ({
    company: "",
    position: "",
    startDate: "",
    endDate: ""
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
