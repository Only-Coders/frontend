<template>
  <div style="position: relative">
    <v-row no-gutters>
      <v-col>
        <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo" class="ma-8 logo"></v-img>
      </v-col>
    </v-row>
    <general-information></general-information>
    <v-row justify="end" no-gutters>
      <v-col cols="1" class="my-16 mr-16">
        <v-btn block color="primary" large>{{ $i18n.t("Onboarding.Shared.nextButton") }}</v-btn>
      </v-col>
    </v-row>
    <img src="@/assets/images/semi_circle.png" alt="semi_circle_wave" class="semi_circle_wave" />
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

<style scoped>
.semi_circle_wave {
  position: absolute;
  bottom: 0;
  width: 400px;
  opacity: 0.4;
  z-index: 1;
}

.logo {
  position: absolute;
}
</style>
