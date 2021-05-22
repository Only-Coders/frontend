import Vue from "vue";

const Mixin = Vue.extend({
  data() {
    return {
      rules: {
        required: (value: string) => !!value || this.$i18n.t("Onboarding.Shared.requiredField"),
        mail: (value: string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || this.$i18n.t("Onboarding.Shared.invalidEmail");
        },
        minPassword: (v: string) => v.length >= 6 || this.$i18n.t("Onboarding.Shared.passwordRule"),
        fileSize: (value: File) => !value || value.size < 1000000 || this.$i18n.t("Onboarding.Shared.profileImageSize"),
        selectRule: (v: []) => !v || v.length >= 1 || this.$i18n.t("Onboarding.Shared.requiredField")
      }
    };
  }
});

export default Mixin;
