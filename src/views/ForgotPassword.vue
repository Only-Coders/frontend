<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo" class="mx-8 mt-6"></v-img>
      </v-col>
    </v-row>

    <v-row justify="center" align="center" no-gutters class="mt-10">
      <v-col cols="9" md="6" class="">
        <v-card width="400px" class="mx-auto" tile elevation="16">
          <h1 class="ml-6 pt-6 mb-2 text-left">{{ $i18n.t("ForgotPassword.forgotTitle") }}</h1>
          <v-card-text>
            <p class="ml-2" align="left">
              {{ $i18n.t("ForgotPassword.forgotMessage") }}
            </p>
            <p class="ml-2" align="left">
              {{ $i18n.t("ForgotPassword.forgotMessage2") }}
            </p>
          </v-card-text>
          <v-form ref="forgot-password">
            <v-row justify="center">
              <v-col cols="10" class="mt-4">
                <v-text-field
                  v-model="email"
                  label="Email"
                  :rules="[rules.required, rules.mail]"
                  v-bind="{ ...inputProps }"
                  validate-on-blur
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row justify="end">
              <v-col cols="4" class="mr-8">
                <v-btn block color="primary" class="primary" large depressed @click="resetPassword">{{
                  $i18n.t("ForgotPassword.buttonLabel")
                }}</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card>
      </v-col>

      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="waves">
        <path
          fill="#bfbfbf"
          fill-opacity="0.25"
          d="M0,192L26.7,176C53.3,160,107,128,160,133.3C213.3,139,267,181,320,192C373.3,203,427,181,480,192C533.3,203,587,245,640,234.7C693.3,224,747,160,800,154.7C853.3,149,907,203,960,218.7C1013.3,235,1067,213,1120,202.7C1173.3,192,1227,192,1280,202.7C1333.3,213,1387,235,1413,245.3L1440,256L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="waves">
        <path
          fill="#bfbfbf"
          fill-opacity="0.2"
          d="M0,288L26.7,256C53.3,224,107,160,160,154.7C213.3,149,267,203,320,213.3C373.3,224,427,192,480,170.7C533.3,149,587,139,640,160C693.3,181,747,235,800,261.3C853.3,288,907,288,960,256C1013.3,224,1067,160,1120,133.3C1173.3,107,1227,117,1280,144C1333.3,171,1387,213,1413,234.7L1440,256L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { VueConstructor } from "vue/types/umd";
import RuleMixin from "@/mixins/rules";
import { inputMixin } from "@/mixins/inputProps";
import { auth } from "@/plugins/firebaseInit";
import notificationsMixin, { NotificationMixin } from "@/mixins/notifications";

export default (Vue as VueConstructor<Vue & NotificationMixin>).extend({
  name: "ForgotPassword",

  mixins: [RuleMixin, inputMixin, notificationsMixin],

  components: {},

  data: () => ({
    email: ""
  }),

  methods: {
    async resetPassword() {
      try {
        if ((this.$refs["forgot-password"] as HTMLFormElement).validate()) {
          const actionCodeSettings = {
            url: process.env.VUE_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true
          };
          const result = await auth.sendPasswordResetEmail(this.email, actionCodeSettings);
          this.success(
            this.$i18n.t("ForgotPassword.successNotificationTitle").toString(),
            this.$i18n.t("ForgotPassword.successNotificationMessage").toString(),
            2000
          );
          setTimeout(() => {
            this.$router.push("/login");
          }, 2500);
        }
      } catch (error) {
        this.errorHandling(error, this.$i18n.t("ForgotPassword.errorNotificationMessage").toString());
      }
    }
  }
});
</script>

<style scoped>
body {
  overflow: auto;
}

#logo {
  width: 100px;
  margin: 20px;
}

.code_type_img {
  width: 350px;
}

.welcome {
  text-align: center;
  padding: 150px;
}

.waves {
  position: absolute;
  bottom: -90px;
  z-index: 1;
  height: 450px;
  width: 4000px;
}

.v-sheet.v-card {
  z-index: 2;
  background: transparent;
}
</style>
