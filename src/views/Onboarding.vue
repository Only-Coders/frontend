<template>
  <div style="position: relative; height: 100vh">
    <v-row no-gutters>
      <v-col>
        <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo" class="ma-8 logo"></v-img>
      </v-col>
    </v-row>
    <!-- <general-information></general-information> -->
    <div class="content">
      <work-experiencie></work-experiencie>
    </div>
    <v-row justify="end" no-gutters class="buttons-row">
      <v-col cols="1" class="my-16 mr-16">
        <v-btn block color="primary" medium>{{ $i18n.t("Onboarding.Shared.nextButton") }}</v-btn>
      </v-col>
    </v-row>
    <img src="@/assets/images/semi_circle.png" alt="semi_circle_wave" class="semi_circle_wave" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import GeneralInformation from "@/components/Onboarding/GeneralInformation.vue";
import WorkExperiencie from "@/components/Onboarding/WorkExperience/WorkExperiencie.vue";

export default Vue.extend({
  name: "Onboarding",

  components: { /*GeneralInformation,*/ WorkExperiencie },

  computed: {}
});
</script>

<style scoped>
.semi_circle_wave {
  position: absolute;
  bottom: 0;
  width: 400px;
  opacity: 0.7;
  z-index: 1;
}

.logo {
  position: absolute;
}

.content {
  height: 800px;
}
</style>
