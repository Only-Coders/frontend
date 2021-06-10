import Vue from "vue";

export type GitPlatformsMixin = InstanceType<typeof Mixin>;

const Mixin = Vue.extend({
  data() {
    return {
      gitPlatforms: [
        {
          platformName: "GITHUB",
          platformImage: require("@/assets/images/Onboarding/github-icon-1.svg")
        },
        {
          platformName: "GITLAB",
          platformImage: require("@/assets/images/Onboarding/gitlab.svg")
        },
        {
          platformName: "BITBUCKET",
          platformImage: require("@/assets/images/Onboarding/bitbucket-icon.svg")
        }
      ]
    };
  }
});

export default Mixin;
