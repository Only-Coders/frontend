<template>
  <div>
    <Header></Header>

    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Header from "@/components/Layout/Header.vue";

export default Vue.extend({
  name: "HeaderLayout",

  components: { Header }
});
</script>
