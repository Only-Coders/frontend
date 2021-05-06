<template>
  <div>
    <v-row>
      <v-col>
        <v-img src="@/assets/images/only-coders-logo.png" width="100" alt="logo"></v-img>
      </v-col>
    </v-row>
    <v-row justify="space-around" align="center">
      <v-col class="welcome" cols="4">
        <h2 class="mb-4">Bienvenido</h2>
        <p align="left">
          Bienvenido a Only Coders, la red social número uno para los profesionales y aficionados al mundo del
          desarrollo de aplicaciones y la programación en general.
        </p>
        <div>
          <img src="@/assets/images/undraw_code_typing.svg" alt="code_typing" class="code_type_img" />
        </div>
      </v-col>
      <v-col cols="4">
        <h1 class="mb-4">Log In</h1>
        <v-form>
          <v-text-field v-model="email" :rules="emailRules" label="Email" rounded filled style="max-width: 450px">
          </v-text-field>
          <v-text-field v-model="password" :rules="emailRules" label="Password" rounded filled style="max-width: 450px">
          </v-text-field>
          <v-btn></v-btn>
        </v-form>
      </v-col>
    </v-row>
    <v-row>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#f8f8f8"
          fill-opacity="0.5"
          d="M0,192L26.7,176C53.3,160,107,128,160,133.3C213.3,139,267,181,320,192C373.3,203,427,181,480,192C533.3,203,587,245,640,234.7C693.3,224,747,160,800,154.7C853.3,149,907,203,960,218.7C1013.3,235,1067,213,1120,202.7C1173.3,192,1227,192,1280,202.7C1333.3,213,1387,235,1413,245.3L1440,256L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"
        ></path>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#bfbfbf"
          fill-opacity="0.1"
          d="M0,192L40,181.3C80,171,160,149,240,128C320,107,400,85,480,96C560,107,640,149,720,186.7C800,224,880,256,960,224C1040,192,1120,96,1200,96C1280,96,1360,192,1400,240L1440,288L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"
        ></path>
      </svg>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",

  components: {},

  computed: {}
});
</script>

<style scoped>
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

svg {
  position: absolute;
}
</style>
