<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo" class="ma-8"></v-img>
      </v-col>
    </v-row>
    <general-information></general-information>
    <v-row justify="end" no-gutters>
      <v-col cols="1" class="my-16 mr-16">
        <v-btn block color="primary" large>{{ $i18n.t("Onboarding.Shared.nextButton") }}</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import GeneralInformation from "@/components/Onboarding/GeneralInformation.vue";

export default Vue.extend({
  name: "Onboarding",

  components: { GeneralInformation },

  computed: {}
});
</script>

<style scoped></style>
