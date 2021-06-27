<template>
  <v-container fluid class="pa-0 main-container">
    <img src="@/assets/images/only-coders-logo.png" width="70vh" alt="logo" class="ma-8 logo" />

    <div justify="center" align="center" no-gutters>
      <v-row no-gutters>
        <v-col>
          <v-carousel
            v-model="carouselIndex"
            height="100vh"
            hide-delimiter-background
            :show-arrows="false"
            light
            touchless
            class="carousel ma-0"
          >
            <v-carousel-item v-for="(step, key) in steps" :key="key">
              <component
                :stepAction="childStepAction"
                @moveNextStep="changeCarouselStep"
                @showButtonLoader="showActionLoader"
                :is="step"
                class="steps"
              >
              </component>
            </v-carousel-item>
          </v-carousel>
        </v-col>
      </v-row>
    </div>

    <v-btn
      @click="noticeChild"
      color="primary"
      class="stepButtons mb-5"
      large
      depressed
      :loading="isLoading"
      v-if="carouselIndex != steps.length - 1 && !$vuetify.breakpoint.xs"
      >{{ $i18n.t("Onboarding.next") }}</v-btn
    >

    <v-btn
      @click="noticeChild"
      color="primary"
      class="stepButtons mb-5"
      small
      fab
      depressed
      :loading="isLoading"
      v-if="carouselIndex != steps.length - 1 && $vuetify.breakpoint.xs"
      ><v-icon size="20"> mdi-arrow-right-bold </v-icon></v-btn
    >

    <v-btn
      @click="finishOnboarding"
      color="primary"
      class="stepButtons mb-5"
      large
      depressed
      :loading="isLoading"
      v-if="carouselIndex == steps.length - 1 && !$vuetify.breakpoint.xs"
    >
      {{ $i18n.t("Onboarding.finish") }}
    </v-btn>

    <v-btn
      @click="finishOnboarding"
      color="primary"
      class="stepButtons mb-5"
      small
      fab
      depressed
      :loading="isLoading"
      v-if="carouselIndex == steps.length - 1 && $vuetify.breakpoint.xs"
    >
      <v-icon size="20"> mdi-check </v-icon>
    </v-btn>

    <img src="@/assets/images/semi_circle.png" alt="semi_circle_wave" class="semi_circle_wave hidden-md-and-down" />
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import GeneralInformation from "@/components/Onboarding/GeneralInformation.vue";
import WorkExperience from "@/components/Onboarding/WorkExperience/WorkExperience.vue";
import StudyExperience from "@/components/Onboarding/StudyExperience/StudyExperience.vue";
import SkillStep from "@/components/Onboarding/SkillStep.vue";
import TagStep from "@/components/Onboarding/TagStep.vue";
import SuggestedContactsStep from "@/components/Onboarding/SuggestedContactsStep.vue";

export default Vue.extend({
  name: "Onboarding",

  components: { GeneralInformation, WorkExperience, StudyExperience, SkillStep, TagStep, SuggestedContactsStep },

  data: () => ({
    carouselIndex: 0,
    steps: [GeneralInformation, WorkExperience, StudyExperience, SkillStep, TagStep, SuggestedContactsStep],
    childStepAction: false,
    isLoading: false
  }),

  methods: {
    showActionLoader() {
      this.isLoading = !this.isLoading;
    },
    noticeChild() {
      this.childStepAction = !this.childStepAction;
    },
    changeCarouselStep() {
      if (this.carouselIndex < this.steps.length - 1) {
        this.carouselIndex++;
      }
    },
    finishOnboarding() {
      this.$router.push("/");
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

.main-container {
  z-index: 0;
}

.semi_circle_wave {
  position: absolute;
  bottom: -200px;
  width: 400px;
  opacity: 0.7;
  z-index: 1;
}

.logo {
  position: absolute !important;
}

@media (min-width: 690px) {
  .v-carousel__controls {
    transform: scale(1);
  }
}

@media (max-width: 690px) {
  .v-carousel__controls {
    transform: scale(0.7);
  }
}

.v-carousel__controls {
  margin-bottom: 10px;
}

.carousel {
  z-index: 2;
}

.stepButtons {
  position: absolute;
  right: 0;
  z-index: 3;
  bottom: 0;
  margin-right: 80px;
  margin-bottom: 10px;
}
</style>
