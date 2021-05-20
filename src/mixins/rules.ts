import { Vue, Component } from "vue-property-decorator";

@Component({})
export class RuleMixin extends Vue {
  public rules = {
    required: (value: string) => !!value || this.$i18n.t("Onboarding.Shared.requiredField"),
    mail: (value: string) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(value) || this.$i18n.t("Onboarding.Shared.invalidEmail");
    },
    minPassword: (v: string) => v.length >= 8 || "Minimo 6 caracteres",
    fileSize: (value: File) => !value || value.size < 1000000 || this.$i18n.t("Onboarding.Shared.profileImageSize"),
    selectRule: (v: []) => !v || v.length >= 1 || this.$i18n.t("Onboarding.Shared.requiredField")
  };

  //   public onlyNumber(event: KeyboardEvent) {
  //     const pattern = /[0-9]/;
  //     if (!pattern.test(event.key)) {
  //       event.preventDefault();
  //     }
  //   }

  //   public dateValidator(startDate: string, endDate: string) {
  //     return new Date(startDate) <= new Date(endDate);
  //   }
}
