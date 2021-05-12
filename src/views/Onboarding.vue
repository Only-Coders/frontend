<template>
  <v-container fluid class="pa-0">
    <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo" class="ma-8 logo"></v-img>

    <v-row no-gutters>
      <v-col>
        <v-carousel
          v-model="carouselIndex"
          height="85vh"
          hide-delimiter-background
          :show-arrows="false"
          light
          class="carousel ma-0"
        >
          <v-carousel-item v-for="(step, key) in steps" :key="key">
            <component :is="step" class="steps"> </component>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>

    <v-row class="fill-height" align="end" justify="center">
      <v-col class="text-end mr-16">
        <v-btn
          @click="changeCarouselStep"
          color="primary"
          class="primary--text mx-5"
          outlined
          large
          depressed
          v-if="carouselIndex != 0"
        >
          Omitir
        </v-btn>

        <v-btn
          @click="changeCarouselStep"
          color="primary"
          class="mx-5"
          large
          depressed
          v-if="carouselIndex != steps.length - 1"
          >Siguiente</v-btn
        >

        <v-btn
          @click="changeCarouselStep"
          color="primary"
          class="mx-5"
          large
          depressed
          v-if="carouselIndex == steps.length - 1"
        >
          Finalizar
        </v-btn>
      </v-col>
    </v-row>

    <img src="@/assets/images/semi_circle.png" alt="semi_circle_wave" class="semi_circle_wave" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import WorkExperience from "@/components/Onboarding/WorkExperience/WorkExperience.vue";
import GeneralInformation from "@/components/Onboarding/GeneralInformation.vue";
import Skills from "@/components/Onboarding/Skills.vue";

export default Vue.extend({
  name: "Onboarding",

  components: { GeneralInformation, WorkExperience, Skills },

  data: () => ({
    carouselIndex: 0,
    steps: [GeneralInformation, WorkExperience, Skills]
  }),

  methods: {
    changeCarouselStep() {
      if (this.carouselIndex < this.steps.length - 1) {
        this.incrementStepIndex();
      }
    },
    finishOnboarding() {
      console.log("Finish onboarding");
    },
    incrementStepIndex() {
      this.carouselIndex++;
    }
  }
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
