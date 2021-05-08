<template>
  <div style="height: 100vh">
    <v-main class="main">
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

<style scoped>
.main {
  overflow: hidden;
  height: 100%;
}
</style>
