<template>
  <div>
    <v-row no-gutters>
      <v-col>
        <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo" class="mx-8 mt-6"></v-img>
      </v-col>
    </v-row>

    <v-row justify="space-around" align="center" no-gutters class="mt-10">
      <v-col class="welcome pl-16 hidden-md-and-down">
        <v-card width="400px" class="mx-auto" flat>
          <h2 class="mb-4">{{ $i18n.t("Login.welcomeTitle") }}</h2>
          <p align="left">
            {{ $i18n.t("Login.welcomeMessage") }}
          </p>
          <div>
            <img src="@/assets/images/undraw_code_typing.svg" alt="code_typing" class="code_type_img" />
          </div>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="pr-lg-16">
        <v-card width="400px" class="mx-auto" flat>
          <h1 class="mb-4 text-center">{{ $i18n.t("Login.loginTitle") }}</h1>
          <v-form>
            <v-row>
              <v-col>
                <v-text-field v-model="email" label="Email" :rules="[rules.required]" v-bind="{ ...inputProps }">
                </v-text-field>
                <v-text-field
                  v-model="password"
                  label="Password"
                  :rules="[rules.minPassword]"
                  v-bind="{ ...inputProps }"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-row justify="center" class="mb-6">
              <a href="#">{{ $i18n.t("Login.passwordReset") }}</a>
            </v-row>
            <v-row class="mb-4">
              <v-col>
                <v-btn block color="primary" large depressed @click="login">{{ $i18n.t("Login.loginButton") }}</v-btn>
              </v-col>
              <v-col>
                <v-btn block color="primary_light" class="primary--text" large depressed @click="register">{{
                  $i18n.t("Login.signInButton")
                }}</v-btn>
              </v-col>
            </v-row>

            <v-divider></v-divider>

            <p class="text-center my-5">O ingresa con</p>
            <v-row justify="center">
              <v-btn depressed color="transparent" class="pa-3 mr-3" fab>
                <v-img src="@/assets/images/google.png" @click="loginGoogle" width="35" alt="google"></v-img>
              </v-btn>

              <v-btn depressed color="transparent" class="pa-3 ml-3" fab>
                <v-img src="@/assets/images/github.png" @click="loginGithub" width="35" alt="github"></v-img>
              </v-btn>
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
import { RuleMixin } from "@/mixins/rules";
import { inputMixin } from "@/mixins/inputProps";
import { auth, google } from "@/plugins/firebaseInit";
import { authenticate } from "@/services/auth";
import jwtDecode from "jwt-decode";
import { setHeaders } from "@/plugins/axios";

export default Vue.extend({
  name: "Home",

  mixins: [RuleMixin, inputMixin],

  components: {},

  data: () => ({
    email: "",
    password: ""
  }),

  methods: {
    async register() {
      try {
        const result = await auth.createUserWithEmailAndPassword(this.email, this.password);

        if (result.user && result.user.email) {
          const actionCodeSettings = {
            url: `http://localhost:8080/login`,
            handleCodeInApp: true
          };
          if (result.user && !result.user.emailVerified) {
            result.user.sendEmailVerification(actionCodeSettings);
          }
        }
      } catch (error) {
        alert(error);
      }
    },

    async login() {
      const result = await auth.signInWithEmailAndPassword(this.email, this.password);
      if (result.user && result.user.emailVerified) {
        const tokenId = await result.user.getIdTokenResult();
        console.log(tokenId);

        //pegarle al backend para login
        const ocToken = await authenticate(tokenId.token);

        localStorage.setItem("accessToken", ocToken.token);
        setHeaders(ocToken.token);

        //const data = jwtDecode(ocToken);

        this.$router.push("/onboarding");
      } else {
        alert("Must verify mail");
      }
    },

    async loginGoogle() {
      //alert("Esperá a la 2.0 capo.");
      const result = await auth.signInWithPopup(google);

      if (result) {
        //const idToken = await result.user.getIdToken(true);
        //TODO: Esta obteniendo el token bien, continuar
      }
    },

    async loginGithub() {
      alert("Me encanta, peeeero... esperá a la 2.1 capo.");
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
