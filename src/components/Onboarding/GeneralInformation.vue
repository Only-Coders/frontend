<template>
  <div>
    <v-row justify="center" align="center" no-gutters>
      <v-col align="center">
        <h2 class="mb-4">{{ $i18n.t("Onboarding.GeneralInformation.title") }}</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="center" no-gutters>
      <v-col align="center" cols="6">
        <p>
          {{ $i18n.t("Onboarding.GeneralInformation.text") }}
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" no-gutters class="pt-16">
      <v-col align="center" cols="2">
        <v-btn class="mx-2 pa-14" fab dark color="primary">
          <v-icon dark large> mdi-camera </v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4">
        <v-form>
          <v-text-field
            v-model="name"
            :rules="emailRules"
            :label="$i18n.t('Onboarding.GeneralInformation.nameLabel')"
            rounded
            filled
            background-color="#dedede"
          ></v-text-field>
          <v-text-field
            v-model="lastName"
            :rules="emailRules"
            :label="$i18n.t('Onboarding.GeneralInformation.lastNameLabel')"
            rounded
            filled
            background-color="#dedede"
          ></v-text-field>
          <v-row>
            <v-col>
              <v-text-field
                v-model="gitUser"
                :rules="emailRules"
                :label="$i18n.t('Onboarding.GeneralInformation.gitUser')"
                rounded
                filled
                background-color="#dedede"
              ></v-text-field>
              <v-text-field
                v-model="birthDate"
                :rules="emailRules"
                :label="$i18n.t('Onboarding.GeneralInformation.birthDate')"
                rounded
                filled
                background-color="#dedede"
              ></v-text-field>
            </v-col>
            <v-col>
              <v-text-field
                v-model="country"
                :rules="emailRules"
                :label="$i18n.t('Onboarding.GeneralInformation.country')"
                rounded
                filled
                background-color="#dedede"
              ></v-text-field>
              <v-text-field
                v-model="city"
                :rules="emailRules"
                :label="$i18n.t('Onboarding.GeneralInformation.city')"
                rounded
                filled
                background-color="#dedede"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-textarea
            v-model="description"
            rounded
            filled
            :label="$i18n.t('Onboarding.GeneralInformation.description')"
            background-color="#dedede"
            rows="3"
            row-height="30"
            auto-grow
            counter
          ></v-textarea>
        </v-form>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "GeneralInformation",

  props: {},

  data: () => ({
    name: "",
    lastName: "",
    gitUser: "",
    birthDate: "",
    country: "",
    city: "",
    description: ""
  })
});
</script>

<style lang="scss" scoped></style>
