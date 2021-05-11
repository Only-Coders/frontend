<template>
  <v-container fluid class="pa-0">
    <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo" class="ma-8 logo"></v-img>

    <v-row no-gutters>
      <v-col>
        <v-carousel
          v-model="model"
          height="85vh"
          hide-delimiter-background
          :show-arrows="false"
          light
          class="carousel ma-0"
        >
          <v-carousel-item v-for="step in steps" :key="step">
            <component :is="step" class="steps"> </component>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row class="fill-height" align="end" justify="center">
      <v-col class="text-end mr-16">
        <v-btn @click="model++" class="mx-5">Omitir</v-btn>
        <v-btn @click="model++" class="mx-5">Siguiente</v-btn>
      </v-col>
    </v-row>

    <img src="@/assets/images/semi_circle.png" alt="semi_circle_wave" class="semi_circle_wave" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import GeneralInformation from "@/components/Onboarding/GeneralInformation.vue";
import WorkExperiencie from "@/components/Onboarding/WorkExperience/WorkExperiencie.vue";
import Skills from "@/components/Onboarding/Skills.vue";

export default Vue.extend({
  name: "Onboarding",

  components: { GeneralInformation, WorkExperiencie, Skills },

  data: () => ({
    model: 0,
    steps: [GeneralInformation, WorkExperiencie, Skills]
  })
});
</script>

<style lang="scss">
.v-item--active {
  color: var(--v-secondary-darken3) !important;
}

.v-carousel__controls__item {
  pointer-events: none !important;
}

.semi_circle_wave {
  position: absolute;
  bottom: 0;
  width: 400px;
  opacity: 0.7;
  z-index: 1;
}

.logo {
  position: absolute !important;
}

.v-carousel__controls {
  margin-bottom: 0;
}

.carousel {
  z-index: 2;
}
</style>
