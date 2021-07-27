<template>
  <v-row justify="center" align="center" no-gutters class="mt-10 pb-14" :class="isLaptop() ? 'pt-0' : 'pt-16'">
    <v-col cols="9" md="6" class="">
      <v-card width="400px" class="mx-auto main_card" tile elevation="16">
        <v-form ref="forgot-password">
          <v-row justify="center" no-gutters>
            <img src="@/assets/images/only-coders-logo.png" width="110vh" alt="logo" class="mx-8 my-12 logo_img" />
            <v-col cols="10" class="mt-4 mb-8">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[rules.required, rules.mail]"
                v-bind="{ ...inputProps }"
                validate-on-blur
              >
              </v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.minPassword]"
                v-bind="{ ...inputProps }"
                type="password"
                validate-on-blur
                @keydown.enter.prevent="register"
              >
              </v-text-field>

              <v-btn
                block
                color="primary_light"
                class="primary--text"
                large
                depressed
                :loading="isLoadingRegister"
                @click="register"
                >{{ $i18n.t("Login.signInButton") }}</v-btn
              >
            </v-col>

            <v-col cols="10" class="mt-3 mb-5">
              <v-divider></v-divider>
            </v-col>

            <p class="pb-2">
              {{ $i18n.t("Login.haveAccount") }}
              <a class="font-weight-black" @click="$router.push('/login')">{{ $i18n.t("Login.loginTitle") }}</a>
            </p>
          </v-row>
        </v-form>
      </v-card>
    </v-col>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="waves" v-if="!isLaptop()">
      <path
        fill="#bfbfbf"
        fill-opacity="0.25"
        d="M0,192L26.7,176C53.3,160,107,128,160,133.3C213.3,139,267,181,320,192C373.3,203,427,181,480,192C533.3,203,587,245,640,234.7C693.3,224,747,160,800,154.7C853.3,149,907,203,960,218.7C1013.3,235,1067,213,1120,202.7C1173.3,192,1227,192,1280,202.7C1333.3,213,1387,235,1413,245.3L1440,256L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
      ></path>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="waves" v-if="!isLaptop()">
      <path
        fill="#bfbfbf"
        fill-opacity="0.2"
        d="M0,288L26.7,256C53.3,224,107,160,160,154.7C213.3,149,267,203,320,213.3C373.3,224,427,192,480,170.7C533.3,149,587,139,640,160C693.3,181,747,235,800,261.3C853.3,288,907,288,960,256C1013.3,224,1067,160,1120,133.3C1173.3,107,1227,117,1280,144C1333.3,171,1387,213,1413,234.7L1440,256L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
      ></path>
    </svg>
  </v-row>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import ruleMixin, { RuleMixin } from "@/mixins/rules";
import inputPropsMixin, { InputPropsMixin } from "@/mixins/inputProps";
import { auth } from "@/plugins/firebaseInit";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";
import { FirebaseErrors } from "@/models/Enums/firebaseErrors";

export default (Vue as VueConstructor<Vue & NotificationMixin & RuleMixin & InputPropsMixin>).extend({
  name: "ForgotPassword",

  mixins: [ruleMixin, inputPropsMixin, notificationsMixin],

  components: {},

  data: () => ({
    email: "",
    password: "",
    isLoadingRegister: false
  }),

  methods: {
    async register() {
      try {
        this.isLoadingRegister = true;
        const result = await auth.createUserWithEmailAndPassword(this.email, this.password);

        if (result.user && result.user.email) {
          const actionCodeSettings = {
            url: process.env.VUE_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
          };
          if (result.user && !result.user.emailVerified) {
            result.user.sendEmailVerification(actionCodeSettings);
            this.success(
              this.$i18n.t("Onboarding.Notifications.emailVerificationTitle").toString(),
              this.$i18n.t("Onboarding.Notifications.emailVerificationMessage").toString(),
              2000
            );
          }
        }
        this.isLoadingRegister = false;
      } catch (error) {
        switch (error.code) {
          case FirebaseErrors.INVALID_EMAIL:
            this.error("Error", this.$i18n.t("Onboarding.Notifications.invalidEmail").toString());
            break;

          case FirebaseErrors.EMAIL_EXISTS:
          case FirebaseErrors.EMAIL_IN_USE:
            this.error("Error", this.$i18n.t("Onboarding.Notifications.emailAlreadyExists").toString());
            break;

          default:
            break;
        }
      } finally {
        this.isLoadingRegister = false;
      }
    },

    isLaptop() {
      return window.innerHeight <= 800;
    }
  }
});
</script>

<style scoped>
.waves {
  position: absolute;
  bottom: 0;
  z-index: 1;
  height: 450px;
  width: 4000px;
}

.main_card {
  z-index: 2;
}
</style>
