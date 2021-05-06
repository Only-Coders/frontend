<template>
  <div>
    <v-row>
      <v-img :src="require('@/assets/images/only-coders-logo.png')" width="100" height="200" alt="logo"></v-img>
    </v-row>
    <!-- <v-row>
      <v-col class="welcome">
        <h2>Bienvenido</h2>
        <p>
          Bienvenido a Only Coders, la red social número uno para los profesionales y aficionados al mundo del
          desarrollo de aplicaciones y la programación en general.
        </p>
        <div>
          <img src="@/assets/images/undraw_code_typing.svg" alt="code_typing" class="code_type_img" />
        </div>
      </v-col>

      <v-col>
        <h1>Log In</h1>
        <v-form>
          <v-text-field v-model="email" :rules="emailRules" label="Email" required> </v-text-field>
          <v-text-field v-model="password" :rules="emailRules" label="Email" required> </v-text-field>
          <v-btn></v-btn>
        </v-form>
      </v-col>
    </v-row> -->
    <v-row> </v-row>
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
</style>
