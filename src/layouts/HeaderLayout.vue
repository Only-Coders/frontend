<template>
  <div>
    <v-app-bar app color="primary" dark> </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HeaderLayout"
});
</script>
