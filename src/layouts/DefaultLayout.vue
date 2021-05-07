<template>
  <div style="height: 100vh">
    <v-main style="height: 100%">
      <router-view />
    </v-main>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DefaultLayout"
});
</script>
